
const createElement = (arr) => { // receives an array
  const htmlElements = arr.map( el => `<span class="btn opacity-70">${el}</span>`);  // creates a new array 
  return htmlElements.join(" "); // converts the array into string and returns
}



// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    
    fetch(url)
        .then(res => res.json())
        .then(issues => displayIssues(issues.data));
}

const displayIssues = (issues) => {
    const parent = document.getElementById("issueCards");
    // parent.innerHTML = "";
    issues.forEach(issue => {
        console.log(issue);
    });
}

loadIssues();