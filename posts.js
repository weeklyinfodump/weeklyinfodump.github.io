let posts = []
class date {
    constructor(day,month,year) {
        this.day = day
        this.month = month
        this.year = year
    }
    toString() {
        return `date: ${this.day}/${this.month}/${this.year}`
    }
}
class post {
    constructor(title,date,description) {
        this.title = title
        this.url = title.replaceAll(" ","-").toLowerCase()
        this.date = date
        this.description = description
    }
}
let post1 = new post("My First Post",new date(21,10,2024),"The first post of my blog")