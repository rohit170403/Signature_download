document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("signatureCanvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");
    const clearBtn = document.getElementById("clearBtn");

    let isDrawing = false;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    clearBtn.addEventListener("click", clearSignature);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadImage(transparent) {
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = transparent ? "signature_transparent.png" : "signature_with_background.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    downloadBtn.addEventListener("click", function () {
        downloadImage(false);
    });

    downloadBtnTransparent.addEventListener("click", function () {
        downloadImage(true);
    });
});
