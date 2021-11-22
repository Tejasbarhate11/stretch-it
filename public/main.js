const urlinput = document.querySelector('#url-input')
const expandbtn = document.querySelector('#expand-btn')
const resultalert = document.querySelector('#result-alert')
const resultlink = document.querySelector('#result-link')
const resulterror = document.querySelector('#result-error')
const waitalert = document.querySelector('#wait-alert')
const copybtn = document.querySelector('#copy-btn')
const closebtn = document.querySelector('#close-btn')

expandbtn.addEventListener('click', () => {
    expandbtn.disabled = true
    resultalert.style.display="none"
    resulterror.style.display="none"
    waitalert.style.display="block"

    if(urlinput.value.trim() === ""){
        alert("Please provide a url")
        urlinput.value=""
        expandbtn.disabled = false
        waitalert.style.display="none"
        return
    }
    
    fetch(`/expand?shortUrl=${urlinput.value}`)
        .then(res => res.text())
        .then(text => {
            resultlink.value = text
            resultalert.style.display="block"
            waitalert.style.display="none"
        })
        .catch(err => {
            resulterror.innerText = err
            waitalert.style.display="none"
            resulterror.style.display="block"
        })
    
    expandbtn.disabled = false
})

closebtn.addEventListener('click', ()=>{
    urlinput.value=""
    resultalert.style.display="none"
})

resulterror.addEventListener('click', ()=>{
    resulterror.style.display="none"
    urlinput.value=""
})

copybtn.addEventListener('click', ()=>{
    resultlink.select();
    resultlink.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(resultlink.value)
    alert("Link copied to clipboard!")
})
