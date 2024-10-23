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
    $("#search").on("change", function() {
        loadPosts()
    })
})
function loadPosts() {
    let tally = 0;
    search = $("#search").val();
    searchTerms = search.toLowerCase().split(" ")
    document.getElementById("previousWeeks").innerHTML = ''
    tmp = ""
    tmp2 = ""
    for (let i in posts) {
        let searchFound1 = search=="";
        let comparisonTerms = posts[i].title.toLowerCase().split(" ")
        for (let j in searchTerms) {
            for (let k in comparisonTerms) {
                if (searchTerms[j]==comparisonTerms[k]) {
                    searchFound1=true;
                }
            }
        }
        if (searchFound1) {
            tally++
            tmp += "<a class='row mb-4' href='"+posts[i].url+"'>"
            tmp += "<span class='lead col-6'>"+posts[i].title+"</span>"
            tmp += "<span class='col-6 text-end'>"+posts[i].date.toString()+"</span>"
            tmp += "<span>"+posts[i].description+"</span>"
            tmp += "</a>"
        }
        
        let searchFound2 = search=="";
        comparisonTerms = posts[i].description.toLowerCase().split(" ")
        for (let j in searchTerms) {
            for (let k in comparisonTerms) {
                if (searchTerms[j]==comparisonTerms[k]) {
                    searchFound2=true;
                }
            }
        }
        if (searchFound2&&!searchFound1) {
            tally++
            tmp2 += "<a class='row mb-4' href='"+posts[i].url+"'>"
            tmp2 += "<span class='lead col-9'>"+posts[i].title+"</span>"
            tmp2 += "<span class='col-3 text-end'>"+posts[i].date.toString()+"</span>"
            tmp2 += "<span>"+posts[i].description+"</span>"
            tmp2 += "</a>"
        }
    }
    document.getElementById("previousWeeks").innerHTML += tmp
    document.getElementById("previousWeeks").innerHTML += tmp2
    if (tally==0) {
        tmp = "<span>There are no posts matching your search</span>"
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
        console.log(i)
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
