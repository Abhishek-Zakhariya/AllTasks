try {

    const url = 'https://jsonplaceholder.typicode.com/posts';

    async function fetchApi() {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async function renderData(slice_data) {
        const tbl = document.querySelector('table')
        const data = await fetchApi();
        // let li = `<tr><th>User ID</th><th>Id</th><th>Title</th><th>Body</th><th>View User</th></tr>`;

        // if (!data) {
        //     console.log("No Data");
        //     return;
        // }
        // data.forEach(item => {
        //     li += `<tr>
        //     <td>${item.userId}</td>
        //     <td>${item.id}</td>
        //     <td>${item.title}</td>
        //     <td>${item.body}</td>
        //     <td><button>View</button></td>`
        // })
        // fetchApi()
        // tbl.innerHTML = li;

        let li = `<tr><th>User ID</th><th>Id</th><th>Title</th><th>Body</th><th>View User</th></tr>`;

        if (!slice_data) {
            return;
        }
        slice_data.forEach(item => {
            li += `<tr>
        <td>${item.userId}</td>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td><a href='/singlepost/${item.id}' class='view'>View</a></td>`
        })
        tbl.innerHTML = li;

        // return slice_data;
    }
    // renderData()

    async function pagination() {
        const data = await fetchApi();
        let first = document.getElementById('first');
        let pre = document.getElementById('pre');
        let next = document.getElementById('next');
        let last = document.getElementById('last');
        let pageno = document.getElementById('pageno')
        var page = 1;
        let start = 1;
        let end = data.length / 10;
        let slice_data = data.slice(start, end);
        renderData(slice_data)

        pageno.style.pointerEvents = "none";
        first.addEventListener("click", () => {
            page = 1;
            paginate1(page);
        })
        pre.addEventListener("click", () => {
            page = page - 1;
            paginate1(page);
        })
        next.addEventListener("click", () => {
            page = page + 1;
            paginate1(page);
        })
        last.addEventListener("click", () => {
            page = 10;
            paginate1(page);
        })
    }

    async function paginate1(page) {

        if (page <= 1) {
            first.style.pointerEvents = "none";
            pre.style.pointerEvents = "none";
        }
        else {
            first.style.pointerEvents = "auto";
            pre.style.pointerEvents = "auto";
        }
        if (page >= 10) {
            next.style.pointerEvents = "none";
            last.style.pointerEvents = "none";
        }
        else {
            next.style.pointerEvents = "auto";
            last.style.pointerEvents = "auto";
        }
        pageno.innerHTML = page

        const data = await fetchApi();
        const tbl = document.querySelector('table')
        let start = 10 * page - 10;
        let end = 10 * page;
        let slice_data = data.slice(start, end);
        console.log(slice_data);
        renderData(slice_data)

        // let li = `<tr><th>User ID</th><th>Id</th><th>Title</th><th>Body</th><th>View User</th></tr>`;

        // if (!slice_data) {
        //     console.log("No Data");
        //     return;
        // }
        // slice_data.forEach(item => {
        //     li += `<tr>
        //     <td>${item.userId}</td>
        //     <td>${item.id}</td>
        //     <td>${item.title}</td>
        //     <td>${item.body}</td>
        //     <td><a href='/singlepost/${item.id}' class='view'>View</a></td>`
        // })
        // tbl.innerHTML = li;
        // return slice_data;
    }
    pagination()

} catch (error) {
    console.log(error);
}

