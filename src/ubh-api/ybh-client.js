
document.addEventListener( "DOMContentLoaded" , function() {
	ybhScript() ;
} ) ;

function ybhScript() {
	
	switch ( getPageType() ) {
		case "landingPage" :
			console.log( "Landing Page Detected" ) ;
			landingPageScript() ;
			break;
		case "cartPage" :
			console.log( "Cart Page Detected" ) ;
			cartPageScript() ;
			break;
		case "checkoutPage" :
			console.log( "Checkout Page Detected" ) ;
			checkoutPageScript() ;
			break;
		case "completedPage" :
			console.log( "Completed Page Detected" ) ;
			completedPageScript() ;
			break;
	}
	
	function getPageType() {
		
		const landingPageRegEx = /(^\/ubh-api\/test-eshop(\/)?$)|(^\/ubh-api\/test-eshop(\/)?(\?))/ ;
		const cartPageRegEx = /^\/ubh-api\/test-eshop\/cart/ ;
		const checkoutPageRegEx = /^\/ubh-api\/test-eshop\/checkout/ ;
		const completedPageRegEx = /^\/ubh-api\/test-eshop\/completed/ ;
		
		const url = window.location.pathname ;
		
		if ( landingPageRegEx.test( url ) ) {
			return "landingPage" ;
		} else if ( cartPageRegEx.test( url ) ) {
			return "cartPage" ;
		} else if ( checkoutPageRegEx.test( url ) ) {
			return "checkoutPage" ;
		} else if ( completedPageRegEx.test( url ) ) {
			return "completedPage" ;
		} else {
			// do nothing
		}
	}
	
	function landingPageScript() {
	
		const queryString= new URLSearchParams( window.location.search ) ;
		const keys = [ "ubhTr" , "commission_percentage" , "cause_name" , "cause_logo_url" ] ;
		let values = [] ;
		
		if ( hasArrivedFromYbh() ) {
			values = keys.map( key => queryString.get( key ) ) ;
			storeYbhReferral() ;
		}
		
		function hasArrivedFromYbh() {
			const hasAllKeys = keys.every( key => queryString.has( key ) ) ;
			if ( hasAllKeys ) {
				const values = keys.map( key => queryString.get( key ) ) ;
				const hasAllValues = values.every( value => value ) ;
				if ( hasAllValues ) {
					return true ;
				}
			}
			return false ;
		}
		
		function storeYbhReferral() {
			let ybhReferral = {} ;
			for( let i=0 ; i<keys.length ; i++ ) {
				ybhReferral[ keys[ i ] ] = values[ i ] ;
			}
			localStorage.setItem( "ybh-referral" , JSON.stringify( ybhReferral ) ) ; // if it is added to local storage when the page is opened as a file (instead of served), is there a difference/are there any artifacts afterwards (localstorage being occupied from the file and never erased perhaps?)
		}
	}
	
	function cartPageScript() {
		
		if ( localStorage.getItem( "ybh-referral" ) ) {
			
			const ybhLogo = document.createElement( "img" ) ;
			ybhLogo.src = "/img/various/logo.svg" ; // blue letters + slim
			// ybhLogo.src = "https://www.youbehero.com/img/various/logo-white.svg" ; // white letters + slim
			// ybhLogo.src = "https://www.youbehero.com/img/various/youbehero-og.jpg" ; // white letters + blue background + square
			
			// const ybhBackgroundUrl = "/img/background-images/homepage-hero.jpg" ;
			// const ybhBackgroundUrl = "https://www.youbehero.com/img/background-images/coolgradient.svg" ;
			const ybhBackgroundUrl = "https://www.youbehero.com/img/background-images/video-bg.svg" ;
			
			const ybhReferral = JSON.parse( localStorage.getItem( "ybh-referral" ) ) ;
			const ybhCard = document.createElement( "div" ) ;
			const totalPriceElement = document.querySelector( ".total-price" ) ; // must be custom-set on each site
			const proceedToCheckoutElement = document.querySelector( ".proceed-to-checkout" ) ; // must be custom-set on each site
			ybhCard.style.background = "white url(\"" + ybhBackgroundUrl + "\") no-repeat center" ;
			ybhCard.style.backgroundSize = "cover" ;
			ybhCard.style.padding = "20px 40px" ;
			ybhCard.style.margin = "20px 40px" ;
			// ybhCard.style.border = "2px lightsteelblue solid" ;
			ybhCard.style.borderRadius = "8px" ;
			ybhCard.style.boxShadow = "0px 0px 20px -10px #cccccccc, 0px 10px 6px -6px #cccccccc" ;
			ybhCard.innerHTML = 
				`<div style="display:flex;flex-wrap:wrap;justify-content:space-around;"><div><img src="https://www.youbehero.com${ ybhReferral[ "cause_logo_url" ] }" style="width:200px;"/></div>` + 
				`<div style="display:flex;flex-direction:column;"><div style="margin-top:1rem;max-width:30rem;">Χάρη σε αυτή την αγορά θα προσφέρεις <strong>${ parseFloat( totalPriceElement.textContent ) * 0.01 * ybhReferral[ "commission_percentage" ] }€</strong> προς την/τον <strong>${ ybhReferral[ "cause_name" ] }</strong> χωρίς κανένα κόστος!</div>` + 
				`<div style="font-size:0.8rem;margin-top:1rem;">Υποστηρίζεται από το <img src="${ ybhLogo.src }" style="width:75px;position:relative;top:3px;"/></div></div>`;
			
			// placed after the total price element
			totalPriceElement.parentElement.after( ybhCard ) ; // must be custom-set on each site
			
			// placed before the checkout button
			proceedToCheckoutElement.parentElement.before( ybhCard.cloneNode( true ) ) ; // must be custom-set on each site
		}
	}
	
	function checkoutPageScript() {
		if ( localStorage.getItem( "ybh-referral" ) ) {
			
			const ybhLogo = document.createElement( "img" ) ;
			ybhLogo.src = "/img/various/logo.svg" ; // blue letters + slim
			// ybhLogo.src = "https://www.youbehero.com/img/various/logo-white.svg" ; // white letters + slim
			// ybhLogo.src = "https://www.youbehero.com/img/various/youbehero-og.jpg" ; // white letters + blue background + square
			
			// const ybhBackgroundUrl = "/img/background-images/homepage-hero.jpg" ;
			// const ybhBackgroundUrl = "https://www.youbehero.com/img/background-images/coolgradient.svg" ;
			const ybhBackgroundUrl = "https://www.youbehero.com/img/background-images/video-bg.svg" ;
			
			const ybhReferral = JSON.parse( localStorage.getItem( "ybh-referral" ) ) ;
			const ybhCard = document.createElement( "div" ) ;
			const totalPriceElement = document.querySelector( ".total-price" ) ; // must be custom-set on each site
			const finalizePurchaseElement = document.querySelector( ".finalize-purchase" ) ; // must be custom-set on each site
			ybhCard.style.background = "white url(\"" + ybhBackgroundUrl + "\") no-repeat center" ;
			ybhCard.style.backgroundSize = "cover" ;
			ybhCard.style.padding = "20px 40px" ;
			ybhCard.style.margin = "20px 40px" ;
			// ybhCard.style.border = "2px lightsteelblue solid" ;
			ybhCard.style.borderRadius = "8px" ;
			ybhCard.style.boxShadow = "0px 0px 20px -10px #cccccccc, 0px 10px 6px -6px #cccccccc" ;
			ybhCard.innerHTML = 
				`<div style="display:flex;flex-wrap:wrap;justify-content:space-around;"><div><img src="https://www.youbehero.com${ ybhReferral[ "cause_logo_url" ] }" style="width:200px;"/></div>` + 
				`<div style="display:flex;flex-direction:column;"><div style="margin-top:1rem;max-width:30rem;">Χάρη σε αυτή την αγορά θα προσφέρεις <strong>${ parseFloat( totalPriceElement.textContent ) * 0.01 * ybhReferral[ "commission_percentage" ] }€</strong> προς την/τον <strong>${ ybhReferral[ "cause_name" ] }</strong> χωρίς κανένα κόστος!</div>` + 
				`<div style="font-size:0.8rem;margin-top:1rem;">Υποστηρίζεται από το <img src="${ ybhLogo.src }" style="width:75px;position:relative;top:3px;"/></div></div>`;
			
			// placed after the total price element
			totalPriceElement.parentElement.after( ybhCard ) ;
			
			// placed before the finalize button
			finalizePurchaseElement.parentElement.before( ybhCard.cloneNode( true ) ) ;
			
			// save totalPrice to localStorage
			ybhReferral[ "sale_amount" ] = parseFloat( totalPriceElement.textContent ) ;
			localStorage.setItem( "ybh-referral" , JSON.stringify( ybhReferral ) ) ; 
			
			// temporary hard-coded transaction_id
			ybhReferral[ "transaction_id" ] = "1" ;
			localStorage.setItem( "ybh-referral" , JSON.stringify( ybhReferral ) ) ; 
		}
	}
	
	function completedPageScript() {
		
		if ( localStorage.getItem( "ybh-referral" ) ) {
			registerTransaction() ;
			localStorage.removeItem( "ybh-referral" ) ;
		}
		
		function registerTransaction() {
			// let src = "http://192.168.1.7:3000/img/ybh-pxl.gif?" ; // lan express server for testing
			let src = "https://youbehero.com/gr/test/trackTransaction?" ;
			const ybhReferral = JSON.parse( localStorage.getItem( "ybh-referral" ) ) ;
			src += "ubhTr=" + encodeURIComponent( ybhReferral[ "ubhTr" ].trim() ) + "&" +
				// "sale_amount=" + encodeURIComponent( ybhReferral[ "sale_amount" ].trim() ) + "&" +
				"sale_amount=" + encodeURIComponent( ybhReferral[ "sale_amount" ] ) + "&" +
				"transaction_id=" + encodeURIComponent( ybhReferral[ "transaction_id" ].trim() ) ;
			console.log(src) ;
			const ybhPixel = document.createElement( "img" ) ;
			ybhPixel.src = src ;
			ybhPixel.style.width = "0px" ;
			ybhPixel.style.height = "0px" ;
			document.querySelector( "body" ).appendChild ( ybhPixel ) ;
		}
	}
}