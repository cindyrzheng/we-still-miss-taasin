const camera = function () {
    let width = 0;
    let height = 0;
    
    const createObjects = function () {

        const video = document.createElement('video');
        video.id = 'video';
        video.width = width;
        video.width = height;
        video.autoplay = true;
        document.body.appendChild(video);
    
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = width;
        canvas.width = height;
        document.body.appendChild(canvas);

        console.log("hey");
    }
    
    
    return {
        video: null,
        context: null,
        photo: null,
        canvas: null,
        localstream:null,
    
        startCamera: function (w = 680, h = 480) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                width = w;
                height = h;
    
                createObjects();
    
                this.video = document.getElementById('video');
                this.canvas = document.getElementById('canvas');
                this.context = this.canvas.getContext('2d');
                this.photo = document.getElementById('photo');
                (function (video) {
                    navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    });
                })(this.video)
            }
        },
    
        takeSnapshot: function () {
            this.context.drawImage(this.video, 0,0, width, height);
            var data = this.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream"); 
        },

        takePicture: function () {
            if (width && height) {
              this.canvas.width = width;
              this.canvas.height = height;
              this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
              var data = this.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream"); 
              
              // downloads to your computer, replace with post to backend
              window.location.href=data;

              var img = this.context.createImageData(this.canvas.width, this.canvas.height);
              for (var i = img.data.length; --i >= 0; )
                img.data[i] = 0;
              this.context.putImageData(img, 0, 0);
            } else {
                this.context.fillStyle = "#AAA";
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                var data = this.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream"); 
                window.location.href=data;
                
                for (var i = img.data.length; --i >= 0; )
                img.data[i] = 0;
              this.context.putImageData(img, 100, 100);

            }
            return data;
          },
        vidOff: function () {
            this.video.pause();
            this.video.src = "";
            (function (video) {
                navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                    stream.getTracks()[0].stop();
                });
            })(this.video)
            console.log("Vid off");
          }
    
    }
    }();
    
    export default camera;