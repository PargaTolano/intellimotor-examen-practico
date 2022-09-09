export default async function downloadFile(filename, blob) {
    const imageURL = URL.createObjectURL(blob);
    
    const anchor = document.createElement('a');
    anchor.href = imageURL;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(imageURL);
}
