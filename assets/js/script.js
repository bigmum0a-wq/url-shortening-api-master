document.addEventListener('DOMContentLoaded', () =>{
    const Input = document.querySelector('input');
    const shterror = document.getElementById('error-message');
    const shortenForm = document.getElementById('shortenLinkf');
    const shortenLinkList = document.querySelector('#shortened-links-list');
    const menuIcon = document.querySelector('.menu-el') 
    const setMenu = document.querySelector('header') 
    const closeIllust = document.querySelector('.section1')
    const clearbtn = document.querySelector('#clear-links') 
    const clearparent = document.querySelector('#clear')
    const shortenBtn = document.querySelector('.shortenbtn')

    
    let UserInput = undefined
    let links = [];

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
                Input.classList.add('error');
                shterror.textContent = 'Please add a link';
                return
            }


            UserInput = Input.value.trim()

            if(!isValidlink(UserInput)){
                shterror.textContent = 'Invalid link. TRy again'
                Input.classList.add('error');

                return
            }
            else{ 
                if(Input.classList.contains('error'))
                {
                    Input.classList.remove('error');
                }
            }

            const Userlink = new URL(UserInput);

            const existingLink = links.find(
                link => link.original === Userlink.href
            );

            if (existingLink) {
                shterror.textContent = 'This URL has already been shortened!';
                Input.classList.add('already');
                shterror.classList.add('already-ex');

                return;
            }


            APIcontrol(Userlink);

        });

        Input.addEventListener('input', () => {
            
            shterror.textContent = ''
            if(Input.classList.contains('error'))
            {
                Input.classList.remove('error');
            }

            if(Input.classList.contains('already'))
            {
                Input.classList.remove('already');
            }

            if(shterror.classList.contains('already-ex'))
            {
                shterror.classList.remove('already-ex');

            }


        })

        menuIcon.addEventListener('click', ()=>{
            
            menuIcon.classList.toggle('open')
            setMenu.classList.toggle('open')
            closeIllust.classList.toggle('open')
            if(menuIcon.classList.contains('open'))
            {
                menuIcon.setAttribute('aria-expanded', 'true')
            }
            else
            {
                menuIcon.setAttribute('aria-expanded', 'false')

            }

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
        (links.length>0) ? 
            clearparent.style.display = 'flex':
             clearparent.style.display = 'none' ;
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

        shortenBtn.disabled = true;
        shortenBtn.textContent = 'Shortening...'
        try {
        const response = await fetch(
            'https://url-shortening-api-master-1am6.onrender.com/api/shorten',
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

            // console.log(data);


            if(!response.ok || !data.result_url){
                shterror.textContent = data.error ||
                 'Could not shorten that link. Try again.';
                return;
            }

            const shortURL = data.result_url;


            // console.log(shortURL);

            addShortenedLink(shortURL);

        } catch {
            shterror.textContent =
                 'Unable shorten this link. Please try again.';
        }
        finally{
            shortenBtn.disabled = false;
            shortenBtn.textContent = 'Shorten It'
        }


    }


    function loadLinks(){

        const savedlinks = localStorage.getItem('links')

        if(savedlinks){
            links = JSON.parse(savedlinks)
        }

    }

    function saveLinks(){

        localStorage.setItem('links', JSON.stringify(links));
        
    }


    function createLi(original, shortURL) {

        const li = document.createElement("li");

        li.classList.add("SHORTEN");

        li.innerHTML = `
            <span class='orginal'>${original}</span>

            <span class="cl-url">
                <span class="lik">${shortURL}</span>
                
                    <button class="copy btn">
                        Copy
                    </button>
                    <button class="delete btn" aria-label="Delete link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> 
                    </button>
            </span>
        `;

        shortenLinkList.appendChild(li);

        const copybtn = li.querySelector(".copy");

        copybtn.addEventListener("click", () => {

            navigator.clipboard.writeText(shortURL).then(() => {

                copybtn.textContent = "copied!";
                copybtn.classList.add('copied')

                setTimeout(() => {
                    copybtn.textContent = "Copy";
                    copybtn.classList.remove('copied')
                }, 3000);

            });
        });
    
        const deleteBtn = li.querySelector(".delete");

        deleteBtn.addEventListener("click", () => {

            links = links.filter(link =>
                link.apilink !== shortURL
            );

            saveLinks();

            li.remove();

            updateClearButton();
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