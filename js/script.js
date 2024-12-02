var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var btnSubmit = document.getElementById('submitSite')
var innerTable = document.getElementById('inner-table')
var siteList;
var regx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

if (localStorage.getItem('siteInfo') != null) {
    siteList = JSON.parse(localStorage.getItem('siteInfo'))
    displaySite()
} else {
    siteList = []
}

btnSubmit.addEventListener('click', function () {
    siteInfo = {
        name: siteName.value,
        url: siteUrl.value
    }
    if (validition() == true ) {
        siteList.push(siteInfo)
        localStorage.setItem('siteInfo', JSON.stringify(siteList));
        clear()
        displaySite()
    } else {
        return;
    }

})

function displaySite() {
    var cartona = '';
    for (var i = 0; i < siteList.length; i++) {
        cartona += `   <tr>
                <th scope="row" class="fw-medium">${i + 1}</th>
                <td>${siteList[i].name}</td>
                <td><a href="${siteList[i].url}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-danger pe-2">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button></td>
              </tr>`
    }
    innerTable.innerHTML = cartona;
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('siteInfo', JSON.stringify(siteList));
    displaySite();
}

function validition() {
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(siteName.value.toLowerCase()) == true) {
            // console.log(siteList[i].name.toLowerCase());
            document.querySelector('.alert').classList.replace('d-none' , 'd-block')
            return false;
        }
    }
    document.querySelector('.alert-danger').classList.replace('d-block' ,'d-none' )
    return true;
}

siteUrl.addEventListener('input' , function(){
    if (regx.test(siteUrl.value)){
        // console.log('matsh')
        siteUrl.classList.remove('is-invalid')
        siteUrl.classList.add('is-valid')
        document.querySelector('.alert-light').classList.replace('d-block' , 'd-none')
        btnSubmit.removeAttribute('disabled')
    }else{
        siteUrl.classList.remove('is-valid')
       siteUrl.classList.add('is-invalid')
       document.querySelector('.alert-light').classList.replace( 'd-none','d-block' )
       btnSubmit.setAttribute('disabled' , 'disabled')

    }
})

function clear(){
    siteName.value = null ;
    siteUrl.value = null
    siteUrl.classList.remove('is-valid')
}