window.addEventListener("load", () => {

const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");


let one_selected = false
let two_selected = false
let three_selected = false
let four_selected = false

one.onclick = function () {
    one_selected = true
    one.classList.add("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
}

two.onclick = function () {
    if (one_selected) {
        two_selected = true
        one.classList.add("active");
        two.classList.add("active");
        three.classList.remove("active");
        four.classList.remove("active");
    }
    else{
    Swal.fire({
        title: "Warning!",
        text: "Kindly First confirm that you are in a safe place!",
        icon: "warning",
        confirmButtonText: "Okay",
    });
}
}
three.onclick = function () {
    if (two_selected) {
        Swal.fire({
            title: "info",
            text: "Kindly allow the camera permissions to access your camera!, We won't store any data!",
            icon: "info",
            confirmButtonText: "Okay",
        });
        three_selected = true;

        // const video = document.getElementById('video');
        // const canvas = document.getElementById('canvas');
        // const result = document.getElementById('result');

        // // Get user media for the camera
        // navigator.mediaDevices.getUserMedia({ video: true })
        //     .then((stream) => {
        //         video.srcObject = stream;
        //     })
        //     .catch((error) => {
        //         console.error('Error accessing the camera:', error);
        //     });

        // // Load the COCO-SSD model for person detection
        // cocoSsd.load()
        //     .then((model) => {
        //         detect(model);
        //     })
        //     .catch((error) => {
        //         console.error('Error loading the model:', error);
        //     });

        // function detect(model) {
        //     model.detect(video)
        //         .then((predictions) => {
        //             // Draw bounding boxes on the canvas
        //             const context = canvas.getContext('2d');
        //             context.clearRect(0, 0, canvas.width, canvas.height);

        //             predictions.forEach((prediction) => {
        //                 context.beginPath();
        //                 context.rect(
        //                     prediction.bbox[0],
        //                     prediction.bbox[1],
        //                     prediction.bbox[2],
        //                     prediction.bbox[3]
        //                 );
        //                 context.lineWidth = 2;
        //                 context.strokeStyle = 'red';
        //                 context.fillStyle = 'red';
        //                 context.stroke();
        //                 context.fillText(
        //                     prediction.class + ` (${Math.round(prediction.score * 100)}%)`,
        //                     prediction.bbox[0],
        //                     prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
        //                 );
        //             });

        //             result.textContent = `People detected: ${predictions.length}`;

        //             // Call detect recursively for real-time detection
        //             requestAnimationFrame(() => {
        //                 detect(model);
        //             });
        //         });
        // }
        // //};
        one.classList.add("active");
        two.classList.add("active");
        three.classList.add("active");
        four.classList.remove("active");
    }
    else{
    Swal.fire({
        title: "Error!",
        text: "Kindly complete the previous steps!",
        icon: "error",
        confirmButtonText: "OK",
    });
}

}
four.onclick = function () {
    if (three_selected) {
        four_selected = true
        one.classList.add("active");
        two.classList.add("active");
        three.classList.add("active");
        four.classList.add("active");
    }
    Swal.fire({
        title: "Hello!",
        text: "This is a SweetAlert pop-up!",
        icon: "info",
        confirmButtonText: "OK",
    });
}
});