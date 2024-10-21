let posts = []
class date {
    constructor(day,month,year) {
        this.day = day
        this.month = month
        this.year = year
        this.sortVal = ""+year+month+day
    }
    toString() {
        return `Date: ${this.day}/${this.month}/${this.year}`
    }
}
class post {
    constructor(title,date,description) {
        this.title = title
        this.url = "posts/"+title.replaceAll(" ","-").toLowerCase()+".html"
        this.date = date
        this.description = description
    }
}
posts.push(new post("My First Post",new date(21,10,2024),"This is the first post of my blog"))

posts = sortPosts(posts,"new")
$("#previousWeeks").ready(function() {
    loadPosts()
    $("#sort").on("change", function() {
        posts = sortPosts(posts, $('#sort').val())
        loadPosts()
    })
})

function loadPosts() {
    document.getElementById("previousWeeks").innerHTML = ''
    for (let i in posts) {
        let tmp = "<a class='row mb-4' href='"+posts[i].url+"'>"
        tmp += "<span class='lead col-9'>"+posts[i].title+"</span>"
        tmp += "<span class='col-3'>"+posts[i].date.toString()+"</span>"
        tmp += "<span>"+posts[i].description+"</span>"
        tmp += "</a>"
        document.getElementById("previousWeeks").innerHTML += tmp
    }

}

function sortPosts(arr,sort) {
    if (arr.length==1) {
        return arr;
    }
    var half_length = Math.ceil(arr.length / 2);    
    set1 = arr.slice(0,half_length)
    set2 = arr.slice(half_length,arr.length)
    set1sorted = sortPosts(set1,sort)
    set2sorted = sortPosts(set2,sort)
    let tmp = []
    for (let i in arr) {
        if (set1sorted.length==0) {
            tmp.push(set2sorted.shift())
        }
        else if (set2sorted.length==0) {
            tmp.push(set1sorted.shift())
        }
        else if (set1sorted[0].date.sortVal<=set2sorted[0].date.sortVal&&sort=="new"||set1sorted[0].date.sortVal>=set2sorted[0].date.sortVal&&sort=="old") {
            tmp.push(set1sorted.shift())
        }
        else if (set1sorted[0].date.sortVal>=set2sorted[0].date.sortVal&&sort=="new"||set1sorted[0].date.sortVal<=set2sorted[0].date.sortVal&&sort=="old") {
            tmp.push(set2sorted.shift())
        }
        
    }
    return tmp
}