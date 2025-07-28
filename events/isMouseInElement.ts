export default function isMouseIn(e: MouseEvent, rect?: DOMRect): boolean {
    if (!rect) {
        console.error("mouseIsIn recieved undefined instead of DOMrect")
        return false;
    } 
    if (rect.left > e.clientX) return false;
    if ((e.clientX - rect.left) > rect.width) return false;
    if (rect.top > e.clientY) return false;
    if ((e.clientY - rect.top) > rect.height) return false;
    return true;
}