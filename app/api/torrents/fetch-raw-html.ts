

export async function fetchRawHtml(url: string) {

    const response = await fetch(url)

    if (response.headers.get('content-type') !== 'text/html') {
        throw new Error("Torrent Url does not return html")
    }

    if(response.status !== 200) {
        throw new Error(response.statusText)
    }

    return response.text()
}