
document.addEventListener('DOMContentLoaded', (event) => {

	// for demo filling with some data
	let addresses  = [
	{
		firstname: 'John',
		lastname: 'DOE',
		full_address: {
			address: '7292 Dictum Av',
			zip_address: '47096',
			city_address: 'San Antonio, MI'
		},
		phone: '648751236'
	},
	{
		firstname: 'Jane',
		lastname: 'PERKINS',
		full_address: {
			address: '191-103 Integer Rd',
			zip_address: '08219',
			city_address: 'Corona New Mexico'
		},
		phone: '658744125'
	},
	{
		firstname: 'Audrey ',
		lastname: 'FAUBERT',
		full_address: {
			address: '66, Place Napoléon',
			zip_address: '59130',
			city_address: 'LAMBERSART'
		},
		phone: '656554871'
	},
	{
		firstname: 'Donnie ',
		lastname: 'DARKO',
		full_address: {
			address: '4225 Country Club Dr',
			zip_address: '90807',
			city_address: 'Long Beach, CA'
		},
		phone: '658745875'
	},
	{
		firstname: 'Tyler',
		lastname: 'DURDEN',
		full_address: {
			address: '420 Paper St',
			zip_address: '90807',
			city_address: 'Wilmington, DE'
		},
		phone: '622458789'
	},
	{
		firstname: 'Margarita',
		lastname: 'GOMEZ',
		full_address: {
			address: 'Carrer de Balmes 422-424',
			zip_address: '08022',
			city_address: 'BARCELONA'
		},
		phone: '632155478'
	}
	]

	let addbtn = document.getElementById('add')
	let searchbtn = document.getElementById('live_search')
	let add_submit = document.getElementById('add_submit')
	let site_name = document.querySelector('#site_name')

	// just demo purpose refresh page on title click
	site_name.addEventListener('click', function() {
		window.location.reload()
	})

	// hide both forms
	$('#add_form').hide();
	$('#search').hide();

	// listen click on add btn =>
	// - prevent chrome error when required input are hidden
	// - toggle the form
	// - hide the other form if visible
	// - remove error msg if any
	// - clear the form on hide by calling the function
	addbtn.addEventListener('click', function(){ 
		if($('input[name="firstname"]').prop("required")) {
			$('input[name="firstname"]').prop('required',false);
		} else {
			$('input[name="firstname"]').prop('required',true);
		}
		if($('input[name="lastname"]').prop("required")) {
			$('input[name="lastname"]').prop('required',false);
		} else {
			$('input[name="lastname"]').prop('required',true);
		}
		if($('input[name="address"]').prop("required")) {
			$('input[name="address"]').prop('required',false);
		} else {
			$('input[name="address"]').prop('required',true);
		}
		if($('input[name="zip_address"]').prop("required")) {
			$('input[name="zip_address"]').prop('required',false);
		} else {
			$('input[name="zip_address"]').prop('required',true);
		}
		if($('input[name="city_address"]').prop("required")) {
			$('input[name="city_address"]').prop('required',false);
		} else {
			$('input[name="city_address"]').prop('required',true);
		}
		if($('input[name="phone"]').prop("required")) {
			$('input[name="phone"]').prop('required',false);
		} else {
			$('input[name="phone"]').prop('required',true);
		}

		$('#add_form').slideToggle();
		$('#search').hide(1000);
		$('#warning').remove();
		emptyForm();
	})

	// listen typing in input and call searchPerson function
	document.getElementById('search_person').addEventListener("keyup", event => {
		searchPerson()
	});

	// listen click on search btn
	// - toggle the form
	// - clear the form on hide
	// - display all data on hide by calling showPerson function 
	searchbtn.addEventListener('click', function(){ 
		$('#search').slideToggle();
		$("#search_person").val("");
		$('#add_form').hide(1000);
		showPerson(addresses)
	})

	// listen click on add submit btn
	// - preventing the form to be submitted
	// - call validateForm function to validate the data submitted
	add_submit.addEventListener('click', function(event){ 
		event.preventDefault();
		validateForm(); 
	})


// validate form function
let validateForm = () => {
	// removing error msg if any
	$('#warning').remove();
	// if required values are empty throw error msg and stop
	if(document.forms["myForm"]["firstname"].value === '' || document.forms["myForm"]["lastname"].value === '' || document.forms["myForm"]["address"].value === '' || document.forms["myForm"]["zip_address"].value === '' || document.forms["myForm"]["city_address"].value === '' || document.forms["myForm"]["phone"].value === '') {

		add_submit.insertAdjacentHTML('afterend', '<div id="warning">Please fill all the fields!</div>');

	// else assign data to variables and call addPerson function with data as arguments
	} else {

			// removing extra blank space / lowercase / capitalize
			let firstname = document.forms["myForm"]["firstname"].value.trim().toLowerCase();
			firstname = firstname[0].toUpperCase() + firstname.slice(1, firstname.length)
			// removing extra blank space / uppercase
			let lastname = document.forms["myForm"]["lastname"].value.trim().toUpperCase();
	        // removing extra blank space / uppercase
	        let address = document.forms["myForm"]["address"].value.trim().toUpperCase();
			// removing extra blank space 
			let zip_address = document.forms["myForm"]["zip_address"].value.trim();
			// removing extra blank space / uppercase
			let city_address = document.forms["myForm"]["city_address"].value.trim().toUpperCase();
			// removing extra blank space
			let phone = document.forms["myForm"]["phone"].value.trim();

			addPerson(firstname, lastname, address, zip_address, city_address, phone);
		}
	}

// display persons function
let showPerson = (addresses) => {

	// check if addresses is null (depends on the searchPerson function) 
	// - if so empty results & display msg
	if (!addresses) {
		$('#container_result').empty()
		$('#container_result').append( '<div class="empty">No matching data!</div>' )

	// check if addresses array is empty (no data in the address book)
	// - if so empty result & display msg
	} else if(addresses.length === 0) {

		$('#container_result').empty()
		$('#container_result').append( '<div class="empty">There is nothing here</div>' )

	// data manipulation if data exists	
	} else {

		// clear the section
		$('#container_result').empty()
		// Ordering result alphabetically
		addresses.sort((a,b) => {
			if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return -1;
			if(a.lastname.toLowerCase() > b.lastname.toLowerCase()) return 1;
			else return 0		
		})
		// iterate through addresses array and filling the result section
		addresses.forEach(element => {
			// formatting phone number to be more readable
			phone = element.phone.substr(0,3) +' '+ element.phone.substr(3,3) + ' ' + element.phone.substr(6,3)
			// add element in the result section
			$('#container_result').append( '<div class="person"><div class="name ">'+ element.lastname + ' ' + element.firstname + '</div><div class="phone">'+ phone_icon + ' ' + phone +'</div><div class="person_btn"><button class="showDetails" data-id="'+addresses.indexOf(element)+'">' + arrow_down + '</button><button class="delete" id="delete_'+addresses.indexOf(element)+'">'+ trash +'</button></div><div class="more" id="details_'+addresses.indexOf(element)+'"></div></div>' )
		})
		// hiding extra informations (address)
		$('.more').hide();

		// adding click listener on each delete btns
		// - call the deletePerson passing the element id as argument
		let delbtn = document.querySelectorAll(".delete");

		for(let i = 0; i < delbtn.length; i++) {
			delbtn[i].addEventListener('click', function(event) {
				event.preventDefault();
				deletePerson(this.id);
			});
		} 

		// adding click listener on all showDetails btns
		let more = document.querySelectorAll(".showDetails")
		for(let i = 0; i < more.length; i++) {
			more[i].addEventListener('click', function(event) {
				event.preventDefault();
				// changing icon accordingly 
				if(this.innerHTML === arrow_down) {
					this.innerHTML = arrow_up
				} else {
					this.innerHTML = arrow_down
				}
				// adding an id in order to link the element to its index in addresses array
				$('#details_' + this.dataset.id).slideToggle();
				// creating the more infos data for each person
				let display = "<div>" + person_address + "</div>"+ addresses[this.dataset.id].full_address.address +"<br>"+ addresses[this.dataset.id].full_address.zip_address +" " + addresses[this.dataset.id].full_address.city_address;
				// adding the info to the person div
				document.getElementById('details_' + this.dataset.id).innerHTML = display;		
			});
		}
	}
}

// search person function
let searchPerson = () => {
	// gathering data entered in the input field
	let input = document.getElementById("search_person");
	let filter = input.value.toLowerCase();
	// filtering addresses array and returning data matching the query (firstname/lastname starting with data & phone number containing part of data)
	let query = addresses.filter(element => {
		return element.lastname.toLowerCase().startsWith(filter) || element.firstname.toLowerCase().startsWith(filter) || element.phone.includes(filter)
	});
	// if no match send false to showPerson function
	if(query.length === 0) {
		showPerson(false)
	// if matches pass the result to showPerson function
	} else {
		showPerson(query)
	}	
}

// add a person function
let addPerson = (firstname, lastname, address, zip_address, city_address, phone) => {

	// push into the addresses array
	addresses.push({firstname: firstname, lastname: lastname, full_address: { address: address, zip_address: zip_address, city_address: city_address}, phone: phone})

	// clear the form when validated
	emptyForm();
	// simulate a click on add btn so it toggle
	addbtn.click()
	// call showPerson function & pass addresses array as argument in order to see the changes
	showPerson(addresses)	
}

// delete an entry function
let deletePerson = (id) => {
	// gathering the id that represents the index of the element in addresses array
	id = id.replace('delete_', '')
	//remove the entry from addresses array
	addresses.splice(id,1);
	// empty the result section
	$('#container_result').empty()
	// call showPerson function & pass addresses array as argument in order to see the changes
	showPerson(addresses)
}

// empty form fields on toggle
let emptyForm = () => {
	$("#firstname").val("");
	$("#lastname").val("");
	$("#address").val("");
	$("#zip_address").val("");
	$("#city_address").val("");
	$("#phone").val(""); 
}

// initialize
showPerson(addresses);

//DOMLoaded end
})