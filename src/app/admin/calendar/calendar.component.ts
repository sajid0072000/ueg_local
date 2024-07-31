import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

interface Job {
  JobName: string;
  StartTime: string;
  EndTime: string;
  TutorName: string;
  Notes: string;
  Location: string;
  StudentName: string;
  Colour: string;
  Topic: string;
  Completed: number;
  Status: string;
  Id: number;
}

interface AvailabilitySlot {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  shortname: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;
  
  calendarOptions!: CalendarOptions;
  availabilityOptions!: CalendarOptions;
  filteredAvailabilityOptions!: CalendarOptions;
  userId!: number;
  isAdmin!: boolean;
  selectedEvent: any;
  loading: boolean = false;
  error: string | null = null;
  availabilitySlots: AvailabilitySlot[] = [];
  filteredAvailabilitySlots: AvailabilitySlot[] = [];
  modalRef: NgbModalRef | undefined;
  showUpdateButton: boolean = false;
  selectedTutor: string = '';
  selectedDate: string = '';
  tutors: string[] = [];

  @ViewChild('eventDialog') eventDialog!: TemplateRef<any>;
  @ViewChild('availabilityDialog') availabilityDialog!: TemplateRef<any>;
  @ViewChild('viewAvailabilitiesDialog') viewAvailabilitiesDialog!: TemplateRef<any>;

  constructor(
    private restApiService: RestApiService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUserId();
    this.isAdmin = sessionStorage.getItem('roleid') === '1';
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    const data = {
      userId: this.userId,
      roleid: sessionStorage.getItem('roleid')
    };

    const loadJobsObservable = this.isAdmin
      ? this.restApiService.getMyJobsAdmin(data)
      : this.restApiService.getMyJobsEducator(data);

    loadJobsObservable.subscribe(
      (response: any) => {
        this.loading = false;
        if (response.success) {
          const events = response.response.map((job: Job) => ({
            title: `${job.JobName} with ${job.StudentName}`,
            start: job.StartTime,
            end: job.EndTime,
            backgroundColor: job.Colour,
            id: job.Id.toString(), // Add job ID for reference
            extendedProps: {
              tutorName: job.TutorName,
              topic: job.Topic,
              completed: job.Completed,
              location: job.Location,
              startTime: this.formatDate(job.StartTime),
              endTime: this.formatDate(job.EndTime),
              notes: job.Notes,
              status: job.Status
            }
          }));

          this.calendarOptions = {
            initialView: 'dayGridMonth',
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
            events: events,
            editable: true, // Enable drag and drop
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
            },
            eventClick: this.handleEventClick.bind(this),
            eventDrop: this.handleEventDrop.bind(this), // Handle event drop
            eventResize: this.handleEventResize.bind(this) // Handle event resize
          };
        } else {
          this.error = 'Failed to load jobs.';
        }
      },
      (error: any) => {
        this.loading = false;
        this.error = 'Error loading jobs: ' + error.message;
        console.error('Error loading jobs:', error);
      }
    );
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  handleEventClick(arg: any): void {
    this.selectedEvent = arg.event;
    this.modalService.open(this.eventDialog);
  }

  handleEventDrop(arg: EventDropArg): void {
    this.updateJobTime(arg.event);
  }

  handleEventResize(arg: any): void { 
    this.updateJobTime(arg.event);
  }

  updateJobTime(event: any): void {
    const start = new Date(event.start);
    const end = new Date(event.end);

    // Function to parse date string in "DD/MM/YYYY H:m" format
    function parseDateString(dateString: string): Date {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/').map(part => parseInt(part, 10));
        const [hours, minutes] = timePart.split(':').map(part => parseInt(part, 10));
        return new Date(year, month - 1, day, hours, minutes);
    }

    // Extract the original start and end times from extendedProps
    const originalStartTime = parseDateString(event.extendedProps.startTime);
    const originalEndTime = parseDateString(event.extendedProps.endTime);

    // Correcting for UK timezone offset
    const startOffset = start.getTimezoneOffset() * 60000;
    const endOffset = end.getTimezoneOffset() * 60000;

    // Setting time to the original time while keeping the new date
    const newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), originalStartTime.getHours(), originalStartTime.getMinutes(), originalStartTime.getSeconds());
    const newEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), originalEndTime.getHours(), originalEndTime.getMinutes(), originalEndTime.getSeconds());

    // Adjusting for timezone
    newStart.setTime(newStart.getTime() - startOffset);
    newEnd.setTime(newEnd.getTime() - endOffset);

    // Format the start and end times as needed for the backend
    const startTimeFormatted = `${newStart.getFullYear()}-${(newStart.getMonth() + 1).toString().padStart(2, '0')}-${newStart.getDate().toString().padStart(2, '0')} ${newStart.getHours().toString().padStart(2, '0')}:${newStart.getMinutes().toString().padStart(2, '0')}:${newStart.getSeconds().toString().padStart(2, '0')}`;
    const endTimeFormatted = `${newEnd.getFullYear()}-${(newEnd.getMonth() + 1).toString().padStart(2, '0')}-${newEnd.getDate().toString().padStart(2, '0')} ${newEnd.getHours().toString().padStart(2, '0')}:${newEnd.getMinutes().toString().padStart(2, '0')}:${newEnd.getSeconds().toString().padStart(2, '0')}`;

    this.restApiService.updateMyJob({
        Id: event.id,
        StartTime: startTimeFormatted,
        EndTime: endTimeFormatted,
        Topic: event.extendedProps.topic,
        Status: event.extendedProps.status,
        Notes: event.extendedProps.notes,
        Location: event.extendedProps.location
    }).subscribe(
        (response: any) => {
            if (response.success) {
                this.notifier.notify('success', 'Job time updated successfully!');
            } else {
                this.error = 'Failed to update job time.';
                this.notifier.notify('error', this.error);
            }
        },
        (error: any) => {
            this.error = 'Error updating job time: ' + error.message;
            console.error('Error updating job time:', error);
            this.notifier.notify('error', this.error);
        }
    );
  }

  updateAvailability(): void {
    this.loadAvailability();
  }

  loadAvailability(): void {
    this.restApiService.getAvailability({ userId: this.userId }).subscribe(
      (response: any) => {
        if (response.success) {
          this.availabilitySlots = JSON.parse(response.response || '[]').map((slot: any) => ({
            ...slot,
            startTime: slot.startTime?.split('+')[0] || '',
            endTime: slot.endTime?.split('+')[0] || ''
          }));

          this.availabilityOptions = {
            initialView: 'timeGridWeek',
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
            events: this.availabilitySlots.map(slot => ({
              title: 'Available',
              start: `${slot.date}T${slot.startTime}`,
              end: `${slot.date}T${slot.endTime}`,
              backgroundColor: '#28a745', // Green color for availability
              extendedProps: {
                slotId: slot.id
              }
            })),
            select: this.handleSelect.bind(this),
            eventClick: this.handleAvailabilityEventClick.bind(this),
            selectable: true,
            selectOverlap: false,
            selectMirror: true,
            selectConstraint: {
              start: '00:00', // Beginning of the day
              end: '24:00' // End of the day
            }
          };
          this.modalRef = this.modalService.open(this.availabilityDialog);
        } else {
          this.error = 'Failed to load availability.';
        }
      },
      (error: any) => {
        this.error = 'Error loading availability: ' + error.message;
        console.error('Error loading availability:', error);
      }
    );
  }

  viewAvailabilities(): void {
    const data = { roleid: sessionStorage.getItem('roleid') };
    this.restApiService.getAllAvailabilities(data).subscribe(
      (response: any) => {
        if (response.success) {
          const slots: AvailabilitySlot[] = response.response.flatMap((item: any) => {
            const availabilitySlots = JSON.parse(item.availabilitySlotsJson || '[]');
            return availabilitySlots.map((slot: AvailabilitySlot) => ({
              ...slot,
              shortname: item.shortname,
              startTime: slot.startTime?.split('+')[0] || '',
              endTime: slot.endTime?.split('+')[0] || ''
            }));
          });

          this.availabilitySlots = slots;
          this.filteredAvailabilitySlots = slots;
          this.tutors = [...new Set(slots.map((slot: AvailabilitySlot) => slot.shortname))]; // Extract unique educator names

          this.filteredAvailabilityOptions = {
            initialView: 'listWeek',
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
            events: this.filteredAvailabilitySlots.map(slot => ({
              title: `Available - ${slot.shortname}`,
              start: `${slot.date}T${slot.startTime}`,
              end: `${slot.date}T${slot.endTime}`,
              backgroundColor: '#28a745', // Green color for availability
              extendedProps: {
                slotId: slot.id
              }
            }))
          };

          this.modalRef = this.modalService.open(this.viewAvailabilitiesDialog, { windowClass: 'custom-modal' });
        } else {
          this.error = 'Failed to load availabilities.';
        }
      },
      (error: any) => {
        this.error = 'Error loading availabilities: ' + error.message;
        console.error('Error loading availabilities:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredAvailabilitySlots = this.availabilitySlots.filter(slot => {
      const matchesTutor = !this.selectedTutor || slot.shortname === this.selectedTutor;
      const matchesDate = !this.selectedDate || slot.date === this.selectedDate;
      return matchesTutor && matchesDate;
    });

    this.filteredAvailabilityOptions = {
      initialView: 'listWeek',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      events: this.filteredAvailabilitySlots.map(slot => ({
        title: `Available - ${slot.shortname}`,
        start: `${slot.date}T${slot.startTime}`,
        end: `${slot.date}T${slot.endTime}`,
        backgroundColor: '#28a745', // Green color for availability
        extendedProps: {
          slotId: slot.id
        }
      }))
    };
  }

  applyFiltersAndChangeDate(): void {
    this.applyFilters();
    if (this.selectedDate) {
      const calendarApi = this.fullCalendar.getApi();
      calendarApi.changeView('listDay', this.selectedDate); // Change the view to listDay and the selected date
    }
  }

  handleSelect(arg: any): void {
    const startTime = arg.startStr.split('T')[1].split('+')[0];
    const endTime = arg.endStr.split('T')[1].split('+')[0];
    const date = arg.startStr.split('T')[0];

    const newSlot: AvailabilitySlot = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      shortname: '' // Set a default value
    };

    this.availabilitySlots.push(newSlot);
    this.showUpdateButton = true;

    // Add the new slot to the calendar
    this.availabilityOptions.events = [
      ...this.availabilityOptions.events as any[],
      {
        title: 'Available',
        start: `${date}T${startTime}`,
        end: `${date}T${endTime}`,
        backgroundColor: 'darkblue' // Dark blue color for new availability
      }
    ];
  }

  handleAvailabilityEventClick(arg: any): void {
    const slotId = arg.event.extendedProps.slotId;
    this.availabilitySlots = this.availabilitySlots.filter(slot => slot.id !== slotId);
    this.showUpdateButton = true;

    // Remove the slot from the calendar
    this.availabilityOptions.events = (this.availabilityOptions.events as any[]).filter(event => event.extendedProps.slotId !== slotId);
  }

  updateAvailabilitySlots(): void {
    this.restApiService.updateAvailability({
      userId: this.userId,
      availabilitySlotsJson: JSON.stringify(this.availabilitySlots)
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.modalRef?.close();
          this.loadAvailability();
          this.notifier.notify('success', 'Availability updated successfully!');
        } else {
          this.error = 'Failed to update availability.';
          this.notifier.notify('error', this.error);
        }
      },
      (error: any) => {
        this.error = 'Error updating availability: ' + error.message;
        console.error('Error updating availability:', error);
        this.notifier.notify('error', this.error);
      }
    );
  }
}
