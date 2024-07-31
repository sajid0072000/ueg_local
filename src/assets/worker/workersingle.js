self.addEventListener('message', function (e) {
    var file = e.data.file;
    var fd = new FormData()
    var retry = 0
    fd.append('file', file);
    fd.append('userId', 4);
    fd.append('fileType', "vod");

    function servReq(fd) {
        var xhr = new XMLHttpRequest();
        // var url = 'http://3.223.37.126:7500/uploadSingle'
        var url = 'https://connect.lykstage.com:5500/uploadSmall';
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resp = JSON.parse(xhr.response)
                    //console.log(resp)
                    if (resp["success"]) {
                        self.postMessage({ type: "finish", status: "Uploaded successfully", response:resp });
                    }
                }
            }
        };
        xhr.onerror = function () {
            console.log("Error")
        };
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percentComplete = parseInt(((e.loaded - e.total * 0.001) / e.total) * 100);
                percentComplete = percentComplete < 0 ? 0 : percentComplete;
                self.postMessage({ type: "progress", perc: percentComplete });
            }
        };

        xhr.send(fd,0);
    }
    servReq(fd)
}, false);
