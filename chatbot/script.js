const sideNavigation = document.querySelector(".sideNavigation"),
    sideBarToggle = document.querySelector(".fa-bars"),
    startContentU1 = document.querySelector(".startContent u1"),
    inputArea = document.querySelector(".inputArea input"),
    sendRequest = document.querySelector(".fa-paper-plane"),
    chatHistory = document.querySelector(".chatHistory u1"),
    startContent = document.querySelector(".startContent"),
    chatContent = document.querySelector(".chatContent"),
    results = document.querySelector(".results");

    promptQuestions = [
        {
            question: "What do you want?",
            icon: "fa-solid fa-wand-magic-sparkles",
        },
        {
            question: "What's on your mind?",
            icon: "fa-solid fa-comment-dots", 
        },
        {
            question: "What's on your mind?",
            icon: "fa-solid fa-comment-dots", 
        },
        {
            question: "What's on your mind?",
            icon: "fa-solid fa-comment-dots", 
        },        
    ];

    window.addEventListener("load",() =>{
        promptQuestions.forEach((data) =>{
            let item = document.createElement("li");
            item.addEventListener("click",()=>{
                getGeminiResponse(data.question,true);
            });
            item.innerHTML=`<div class="promptSuggestion">
            <p>${data.question}</p>
            <div class="icon"><i class="${data.icon}"></i></div>
            </div>`;

            startContentU1.append(item);
        });
    });

    function newChat() {
        let newChatItem = document.createElement("li");
        newChatItem.textContent = "New Chat started";
        chatHistory.appendChild(newChatItem);
    }
    

    inputArea.addEventListener("keyup", () => {
        const sendIcon = document.querySelector(".fa-paper-plane");
        if (inputArea.value.trim()) {
            sendIcon.style.display = "inline-block";  // Show the icon when there's input
        } else {
            sendIcon.style.display = "none";  // Hide the icon when input is empty
        }
    });
    

    sendRequest.addEventListener("click",()=>{
        getGeminiResponse(inputArea.value,true);
    });

    function getGeminiResponse(question, appendHistory){
        console.log(question);
        if(appendHistory){

            let historyLi = document.createElement("li");
            historyLi.addEventListener("click",()=>{
                getGeminiResponse(question,false);
            });

            historyLi.innerHTML=`<i class="fa-regular fa-message"></i>${question}`;
            chatHistory.append(historyLi);
        }

        results,innerHTML="";
        inputArea.value="";

        startContent.style.display="none";
        chatContent.style.display="block";

        let resultTitle=`
        <div class="resultTitle">
        <img src=""/>
        <p>${question}</p>
        </div>
        `;

        let resultData=`
        <div class="resultData">
        <img src="https://img.freepik.com/premium-photo/emerald-green-letter-c-with-smoke-design_1271117-9207.jpg"/>
        <div class="loader">
        <div class="animatedBG"></div>
        <div class="animatedBG"></div>
        <div class="animatedBG"></div>
        </div>
        </div>
        `;

        results.innerHTML+=resultTitle;
        results.innerHTML+=resultData;


        const AIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA0M9OF5_Tn_NEjEYA13xhpNxHL3eBpXHw`
        fetch(AIURL,{
            method:"POST",
            body: JSON.stringify({
                contents:[{parts:[{text:question}] }],
            }),
        })
            .then((response)=>response.json())
            .then((data)=>{
                document.querySelector(".results .resultData").remove();

        let responseData = jsonEscape(data.candidates[0].content.parts[0].text);
        console.log(responseData);

        let responseArray = responseData.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if(i==0 || i%2!==1){
                newResponse+=responseArray[i];
            }else{
                newResponse+="<strong>" + 
                responseArray[i].split(" ").join("&nbsp") + 
                "</strong>";
            }                
        }

        results.innerHTML+=`
            <div class="resultResponse">
            <img src="https://t3.ftcdn.net/jpg/02/15/61/92/360_F_215619203_9mmrDaPnSHOUBfz9XVkjBAknw5XFEK0D.jpg"
            style="width: 50px; height: 50px;" alt="Image"/>
            <p id ="typeEffect">${newResponse}</p>
            </div>
            `;

        let newResponseData = newResponse2.split(" ");
            for (let j = 0; j < newResponseData.length; j++) {
                timeOut(j,newResponseData[j]+" ");                    
            }

        let newResponse2=newResponse.split("*").join(" ");

        let textArea = document.createElement("textarea");
        textArea.innerHTML=newResponse2;
    

            });
        
    } 
    const timeOut =(index,nextWord)=>{
        setTimeout(function(){
            document.getElementById("typeEffect").innerHTML+=nextWord;
        },75 * index);
    };
        


    function newChat(){
        startContent.style.display="block";
        chatContent.style.display="none";
    }

    function jsonEscape(str){
        return str
        .replace(new RegExp("\r?\n\n","g"),"<br>")
        .replace(new RegExp("\r?\n","g"),"<br>");
    }