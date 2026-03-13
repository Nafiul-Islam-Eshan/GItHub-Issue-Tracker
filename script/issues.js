let currentTab = "all";
const allContainer = document.getElementById("issueCards");
const openContainer = document.getElementById("openIssueCards");
const closeContainer = document.getElementById("closeIssueCards");
const issueCount = document.getElementById("issueCount");
const issuesSearch = document.getElementById("issuesSearch")

// Reuseable functions
const createElement = (arr) => { 
    const htmlElements = arr.map( el => ` <div class="badge border-gray-300 bg-base-300 text-sm rounded-2xl">${el}</div>`); 
    return htmlElements.join(" "); 
}
const formatName = (name) => {
    const wordsArr = name.split("_")
    const capitalizedWordsArr = wordsArr.map(word => word[0].toUpperCase() + word.slice(1));
    return capitalizedWordsArr.join(" ");
};





const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    
    fetch(url)
        .then(res => res.json())
        .then(issues => displayIssues(issues.data));
}

const loadIssueDetail = async (id) => { 
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url); 
  const detail = await res.json(); 
  displayIssueDetail(detail.data); 
}

const displayIssueDetail = (detail) => {
    const issueDetails = document.getElementById("issueDetails")

    //     {
    // "id": 33,
    // "title": "Add bulk operations support",
    // "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
    // "status": "open",
    // "labels": [
    // "enhancement"
    // ],
    // "priority": "low",
    // "author": "bulk_barry",
    // "assignee": "",
    // "createdAt": "2024-02-02T10:00:00Z",
    // "updatedAt": "2024-02-02T10:00:00Z"
    // }


    issueDetails.innerHTML = `
        <div class="space-y-6">
            <!-- Upper -->
            <div class="space-y-1">
                <h2 class="font-bold text-xl">${detail.title}</h2>
                <div class="flex gap-2 items-center">
                    <div class="badge text-white rounded-2xl ${
                        detail.status==="open"? "bg-[#00A96E]" : "bg-[#A855F7]"
                    }">${detail.status==="open"? "Opened" : "Closed"}</div>
                    <div class="rounded-full p-[2px] w-1 bg-gray-400"></div>
                    <p class="text-gray-500 text-sm">Opened by ${formatName(detail.author)}</p>
                    <div class="rounded-full p-[2px] w-1 bg-gray-400"></div>
                    <p class="text-gray-500 text-sm">${
                            new Date(detail.createdAt).toLocaleDateString('en-GB')
                        }</p>
                </div>
            </div>
            <!-- Middle 1 -->
            <div> ${createElement(detail.labels)} </div>
            <!-- Middle 2 -->
            <p class="text-gray-500"> ${detail.description} </p>
                            <!-- Lower -->
            <div class="bg-base-200 p-4 flex justify-between gap-2 items-center">
                <!-- left -->
                <div class="w-1/2">
                    <p class="text-gray-500 text-sm">Assignee:</p>
                    <h4 class="text-sm font-semibold">${formatName(detail.author)}</h4>
                </div>
                <!-- Right -->
                <div class="w-1/2">
                    <p class="text-gray-500 text-sm">Priority:</p>
                    <div class="badge border-gray-300 bg-base-300 rounded-2xl">${detail.priority}</div>
                </div>
            </div>
        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">Close</button>
            </form>
        </div>
    `;

    document.getElementById("my_modal_5").showModal()
}


const displayIssues = (issues) => {
    allContainer.innerHTML = "";
    openContainer.innerHTML = "";
    closeContainer.innerHTML = "";

    issues.forEach(issue => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
                <div onclick="loadIssueDetail(${issue.id})" class="p-4 shadow-xl border-t-5 rounded-lg space-y-3 h-full ${
                    issue.status === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"
                }">

                    <div class="flex justify-between items-center">
                        <div class=""><img src="./assets/Open-Status.png" alt=""></div>
                        <div class="badge border-gray-300 bg-base-300 text-xs">${issue.priority}</div>
                    </div>

                    <div class="space-y-4">
                        <div class="space-y-2">
                            <h3 class="font-semibold text-sm">${issue.title}</h3>
                            <p class="text-xs opacity-50">${issue.description}</p>
                        </div>
                        <div class="flex gap-2">${createElement(issue.labels)} </div>
                    </div>

                    <hr class="opacity-15">

                     <div class="space-y-1">
                        <p class="opacity-50 text-xs">#1 by ${issue.author}</p>
                        <p class="opacity-50 text-xs">${
                            new Date(issue.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
                        }</p>
                     </div>
                </div>
        `;

        
        // append clones so each container has its own node
        allContainer.append(newDiv.cloneNode(true));
        if (issue.status === "open") {
            openContainer.append(newDiv);
        } else {
            closeContainer.append(newDiv);
        }
    });

    issuesCount();
}

loadIssues();







const issuesCount = () => {    
    const count = {   
        all : allContainer.children.length,
        open : openContainer.children.length,
        close : closeContainer.children.length,
    };


    if (currentTab ==="all") available = count.all;
    else if (currentTab === "open") available = count.open;
    else if (currentTab === "close") available = count.close;

    issueCount.innerText = available;

}
issuesCount();



function tabSwitchingStyle (tab){
    const tabs = ["all", "open", "close"];
    currentTab = tab;

    for (const t of tabs) {
        const selectedTab = document.getElementById(t);
        if (t === tab){
            selectedTab.classList.add("btn-primary");
        }
        else{
            selectedTab.classList.remove("btn-primary");
        }
    }


    if (tab === "all") {
        allContainer.classList.remove("hidden");
        openContainer.classList.add("hidden");
        closeContainer.classList.add("hidden");
    } else if (tab === "open") {
        allContainer.classList.add("hidden");
        openContainer.classList.remove("hidden");
        closeContainer.classList.add("hidden");
    } else if (tab === "close") {
        allContainer.classList.add("hidden");
        openContainer.classList.add("hidden");
        closeContainer.classList.remove("hidden");
    }

    issuesCount();
}




document.getElementById("issueBtn").addEventListener("click", () => {
    console.log(issuesSearch.value);
})




