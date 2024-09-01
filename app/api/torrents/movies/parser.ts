import { parse } from "node-html-parser"


export function parse1337xTable(html: string) {
    const root = parse(html)

    return root.querySelector(".table")?.querySelector("tbody")?.querySelectorAll("tr")?.slice(0, 5).map(row => {

        const nameRow = row.querySelector(".name")

        const href = nameRow?.querySelectorAll("a")?.at(1)?.getAttribute("href")

        let seeds = 0;

        try {
            seeds = parseInt(row.querySelector(".seeds")?.innerText!!)
        } catch (error) {

        }

        let leeches = 0

        try {
            leeches = parseInt(row.querySelector(".leeches")?.innerText!!)
        } catch (error) {

        }

        return {
            name: nameRow?.innerText,
            link: href,
            seeds,
            leeches,
            date: row.querySelector(".coll-date")?.innerText,
            size: row.querySelector(".size")?.firstChild?.innerText
        }
    })


}