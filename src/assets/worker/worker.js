
self.addEventListener('message', function (e) {
    var chunk = e.data.chunk;
    var port = e.data.port;
    var fileId = e.data.fileId;
    var fd = new FormData();
    var retry = 0
    fd.append('file', chunk);
    fd.append('port', port);
    fd.append('fileId', fileId);
    fd.append('retry', retry);

    function servReq(fd) {
        var xhr = new XMLHttpRequest();
        // var url = 'http://3.223.37.126:' + port + '/uploadChunk'
        var url = 'https://connect.lykstage.com:' + port + '/uploadChunk';

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resp = JSON.parse(xhr.response)
                    //console.log(resp)
                    if (resp["success"]) {
                        self.postMessage({ type: "finish", port: port, status: "Uploaded successfully" });
                    }
                } else {
                    retry = retry + 1
                    console.log("Retrying : " + retry)
                    fd.set('retry', retry);
                    servReq(fd)
                }
            }
        };
        xhr.onerror = function () {
            retry = retry + 1
            console.log("Retrying : " + retry)
            fd.set('retry', retry);
            servReq(fd)
        };
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percentComplete = parseInt(((e.loaded - e.total * 0.001) / e.total) * 100);
                percentComplete = percentComplete < 0 ? 0 : percentComplete;
                self.postMessage({ type: "progress", perc: percentComplete, port: port });
            }
        };

        xhr.send(fd, 0);
    }
    servReq(fd)
}, false);
