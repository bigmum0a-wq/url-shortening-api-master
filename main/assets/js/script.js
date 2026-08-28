document.addEventListener('DOMContentLoaded', () =>{
    // const  all_a = document.querySelectorAll('a');
    const Input = document.querySelector('input');
    // const shuternBtn = document.querySelector('.shortenbtn');
    const shterror = document.getElementById('error-message');
    const shortenForm = document.getElementById('shortenLinkf');
    const shortenLinkList = document.querySelector('#shortened-links-list');
    const menuIcon = document.querySelector('.menu-el') 
    const setMenu = document.querySelector('header') 
    const closeIllust = document.querySelector('.section1')
    const clearbtn = document.querySelector('#clear-links') 
    const clearparent = document.querySelector('#clear')


    
    let UserInput = undefined
    let links = []


    function main() {

        loadLinks();

        links.forEach(link => {
            createLi(
                link.original,
                link.apilink
            );
        });

        updateClearButton()
        errorDisplay();
        removeLinks()
    }

    const errorDisplay = () => {

        shortenForm.addEventListener('submit', (e) =>{

            e.preventDefault();
            if(Input.value === ''){
                Input.style.border = '2px solid rgb(253, 6, 6)';
                shterror.textContent = 'Please add a link';
                return
            }

            UserInput = Input.value.trim()

            if(!isValidlink(UserInput)){
                shterror.textContent = 'Invalid link. TRy again'
                Input.style.border = '4px solid rgb(253, 6, 6)';

                return
            } 

            const Userlink = new URL(UserInput);

            const existingLink = links.find(
                link => link.original === Userlink.href
            );

            if (existingLink) {
                shterror.textContent = 'This URL has already been shortened!';
                shterror.style.color = "rgb(6, 253, 27)"
                Input.style.border = '2px solid rgb(6, 253, 27)';

                return;
            }

            APIcontrol(Userlink);

        });

        Input.addEventListener('input', () => {
            
            if(Input.value!=='') 
            {
                shterror.textContent = ''
                Input.style.border = 'none'

                return
            }

        })

        menuIcon.addEventListener('click', ()=>{
            
            menuIcon.classList.toggle('open')
            setMenu.classList.toggle('open')
            closeIllust.classList.toggle('open')

        })
                   
    }

    const isValidlink = (Userlink) =>{
        try{
            new URL(Userlink);
            return true;
        } catch {
            return false;
        }
    }

    function updateClearButton() {
        (links.length>0) ? clearparent.style.display = 'flex': clearparent.style.display = 'none' 
    }

    const removeLinks = () =>{
        clearbtn.addEventListener('click', () =>{
            links = []
            localStorage.removeItem('links')
            shortenLinkList.innerHTML = '';

            updateClearButton();

        })
    }

    async function APIcontrol(Userlink) {

        try {
        const response = await fetch(
            'http://localhost:3000/api/shorten',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: Userlink.href
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            const shortURL = data.result_url;

            console.log(shortURL);

            addShortenedLink(shortURL);

        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }


    function loadLinks(){

        const savedlinks = localStorage.getItem('links')

        if(savedlinks){
            links = JSON.parse(savedlinks)
        }

    }

    function saveLinks(){

        localStorage.setItem('links', JSON.stringify(links))
        
    }


    function createLi(original, shortURL) {

        const li = document.createElement("li");

        li.classList.add("SHORTEN");

        li.innerHTML = `
            <span class='orginal'>${original}</span>

            <span class="cl-url">
                <span class="lik">${shortURL}</span>
                <button class="copy btn">Copy</button>
            </span>
        `;

        shortenLinkList.appendChild(li);

        const copybtn = li.querySelector(".copy");

        copybtn.addEventListener("click", () => {

            navigator.clipboard.writeText(shortURL).then(() => {

                copybtn.textContent = "copied!";
                copybtn.style.backgroundColor = "#000000";

                setTimeout(() => {
                    copybtn.textContent = "Copy";
                    copybtn.style.backgroundColor =
                        "hsl(180, 66%, 49%)";
                }, 3000);

            });
        });

        return li;
    }

    function addShortenedLink(shortURL) {

        if (shortURL === undefined) {
            return;
        }

        links.push({
            original: UserInput,
            apilink: shortURL
        });

        saveLinks();

        createLi(UserInput, shortURL);
        updateClearButton()
    }


    main();
})