const createElement = (arr) => { 
    const htmlElements = arr.map( el => ` <div class="badge border-gray-300 bg-base-300 text-xs">${el}</div>`); 
    return htmlElements.join(" "); 
}

let currentTab = "all";
const allContainer = document.getElementById("issueCards");
const openContainer = document.getElementById("openIssueCards");
const closeContainer = document.getElementById("closeIssueCards");
const issueCount = document.getElementById("issueCount");


const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    
    fetch(url)
        .then(res => res.json())
        .then(issues => displayIssues(issues.data));
}

const displayIssues = (issues) => {
    allContainer.innerHTML = "";
    openContainer.innerHTML = "";
    closeContainer.innerHTML = "";

    issues.forEach(issue => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
                <div class="p-4 shadow-xl border-t-5 rounded-lg space-y-3 h-full ${
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
            openContainer.append(newDiv.cloneNode(true));
        } else {
            closeContainer.append(newDiv.cloneNode(true));
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









