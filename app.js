let form=document.querySelector("form")
let maincontainer=document.querySelector(".maincontainer")
let repocontainer=document.querySelector(".repocontainer")
let username;
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let username=document.querySelector("#username").value
    getResponse(username)
})

function getResponse(username){
    
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
            document.querySelector(".profilepic").style.border='0px'
            if(data.avatar_url!=undefined){
                let profilepic=document.querySelector(".profilepic").style.display=""
                let context=document.querySelector(".context").style.display=""
                let errdisplay=document.querySelector(".nouser").style.display="none"

                document.querySelector(".profilepic").style.backgroundImage=`url(${data.avatar_url==undefined?"./assests/image1.jpg":data.avatar_url})`
                maincontainer.querySelector(".name").innerHTML=data.name
                maincontainer.querySelector(".username").innerHTML=data.login
                maincontainer.querySelector(".bio").innerHTML=data.bio
                maincontainer.querySelector(".created").innerHTML=data.created_at
                maincontainer.querySelector(".email").innerHTML=data.email
                maincontainer.querySelector(".location").innerHTML=data.location
                maincontainer.querySelector(".followers").innerHTML=`Total Number of Follower: ${data?.followers}`
                maincontainer.querySelector(".repos").innerHTML=`Total Number Of Public Repository : ${data.public_repos}`
                maincontainer.querySelector(".url").querySelector("a").setAttribute("href",data.html_url)
                maincontainer.querySelector(".url").querySelector("a").innerHTML=data.html_url
                console.log(data)
            }
            else{
                let profilepic=document.querySelector(".profilepic").style.display="none"
                let context=document.querySelector(".context").style.display="none"
                let errdisplay=document.querySelector(".nouser").style.display="flex"
                
            }
    
        })
        repocontainer.innerHTML=""
        fetch(`https://api.github.com/users/${username}/repos`)
          .then((res) => res.json())
          .then((data) => {
            data.forEach(repo => {
                let repocontain=`
                <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="repo">
                <h1 class="reponame">${repo.name}</h1>
                <h2>Description</h2>
                <P class="description">${repo.description}</P>
                <h2>Created At</h2>
                <P class="repocreated">${repo.created_at}</P>
                <h2>URL</h2>
                <P class="repourl"><a href="${repo.html_url}">${repo.html_url}</a></P>
                <h2>Languages Used</h2>
                <P class="language">${repo?.language}</h4>
                <h2>Star Count</h2>
                <P class="starcount">
                    <span class="material-symbols-outlined">
                    star
                    </span>${repo.stargazers_count}
                </P>
                <h2>Watchers</h2>
                <P class="watchers">
                    <span class="material-symbols-outlined">
                    visibility
                    </span>
                    ${repo.watchers}
                </P>
                <h2>License</h2>
                <P class="license lastinfo">${repo.license?.name}</P>
                </div>
                </div>
            
            `
                repocontainer.innerHTML+=repocontain
            });
            
            
            
        });
    }
    
    
    
    
    // required for checking
    // console.log(repo.name,repo.description,repo.html_url,repo.created_at,repo?.language,repo.license?.name,repo.stargazers_count,repo.watchers)
    // console.log(repocontainer)

  