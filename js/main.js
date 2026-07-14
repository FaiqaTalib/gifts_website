// VELVETWRAP - jQuery & JavaScript

$(document).ready(function () {

  // PRELOADER 
  setTimeout(function () {
    $('#preloader').fadeOut(600);
  }, 2200);

  // NAVBAR SCROLL EFFECT 
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('.navbar-velvet').addClass('scrolled');
      $('#backToTop').addClass('visible');
    } else {
      $('.navbar-velvet').removeClass('scrolled');
      $('#backToTop').removeClass('visible');
    }
  });

  // BACK TO TOP 
  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });

  // SCROLL ANIMATIONS 
  function checkAnimations() {
    var windowBottom = $(window).scrollTop() + $(window).height();
    $('.fade-up, .fade-left, .fade-right').each(function () {
      var elemTop = $(this).offset().top + 60;
      if (windowBottom > elemTop) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', checkAnimations);
  checkAnimations(); // run on load

  // HERO PARTICLES 
  (function spawnParticles() {
    var $container = $('.hero-particles');
    if (!$container.length) return;
    for (var i = 0; i < 18; i++) {
      var top = Math.random() * 100;
      var left = Math.random() * 100;
      var delay = Math.random() * 6;
      var dur = 4 + Math.random() * 4;
      $('<span>')
        .css({
          top: top + '%',
          left: left + '%',
          'animation-delay': delay + 's',
          'animation-duration': dur + 's'
        })
        .appendTo($container);
    }
  })();

  // ACTIVE NAV LINK 
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.navbar-velvet .nav-link').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

  // FAQ ACCORDION 
  $(document).on('click', '.faq-question', function () {
    var $item = $(this).closest('.faq-item');
    if ($item.hasClass('open')) {
      $item.removeClass('open');
      $item.find('.faq-answer').slideUp(300);
    } else {
      $('.faq-item.open .faq-answer').slideUp(300);
      $('.faq-item').removeClass('open');
      $item.addClass('open');
      $item.find('.faq-answer').slideDown(300);
    }
  });

  // TOAST NOTIFICATION 
  function showToast(message, icon) {
  let toast = document.createElement("div");
  toast.className = "custom-toast";

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

  // ADD TO CART 
  var cartCount = 0;

  $(document).on('click', '.btn-add-cart', function (e) {
    e.preventDefault();
    cartCount++;
    $('.cart-badge').text(cartCount).addClass('bounce');
    setTimeout(function () { $('.cart-badge').removeClass('bounce'); }, 400);
    var productName = $(this).closest('.product-card').find('.product-name').text() || 'Item';
    showToast('"' + productName + '" added to cart!', 'fa-shopping-bag');
  });

  // ADD TO WISHLIST
  $(document).on('click', '.btn-wishlist', function (e) {
    e.preventDefault();
    var $icon = $(this).find('i');
    $icon.toggleClass('far fas');
    if ($icon.hasClass('fas')) {
      $(this).css('background', 'var(--gold-light)');
      showToast('Added to wishlist!', 'fa-heart');
    } else {
      $(this).css('background', '');
      showToast('Removed from wishlist.', 'fa-heart-broken');
    }
  });

  
  // CONTACT FORM 
  $(document).on('submit', '#contactForm', function (e) {
    e.preventDefault();
    var $btn = $(this).find('.btn-submit');
    $btn.text('Sending...').prop('disabled', true);
    setTimeout(function () {
      showToast('Message sent! We\'ll respond within 24hrs.', 'fa-paper-plane');
      $('#contactForm')[0].reset();
      $btn.text('Send Message').prop('disabled', false);
    }, 1800);
  });

  // SIGN IN FORM 
  $(document).on('submit', '#signinForm', function (e) {
    e.preventDefault();
    var $btn = $(this).find('button[type="submit"]');
    $btn.text('Signing in...').prop('disabled', true);
    setTimeout(function () {
      showToast('Welcome back to VelvetWrap!', 'fa-user');
      $btn.text('Sign In').prop('disabled', false);
    }, 1500);
  });

  document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let pass = document.getElementById("regPassword").value;
  let confirm = document.getElementById("regConfirm").value;

  if (pass !== confirm) {
    showToast("Passwords do not match!", "fa-exclamation-circle");
    return;
  }

  if (pass.length < 8) {
    showToast("Password must be at least 8 characters!", "fa-exclamation-circle");
    return;
  }

  showToast("Account Created! Welcome to VelvetWrap", "fa-gift");
});

  // IMAGE ZOOM PLACEHOLDER 
  $(document).on('mouseenter', '.product-img-wrap', function () {
    $(this).css('cursor', 'zoom-in');
  });

  // TABS (PRODUCT PAGE) 
  $(document).on('click', '.tab-btn', function () {
    var target = $(this).data('target');
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content-panel').hide();
    $(target).fadeIn(300);
  });

  // QUANTITY SPINNER
  $(document).on('click', '.qty-plus', function () {
    var $input = $(this).siblings('.qty-input');
    $input.val(parseInt($input.val()) + 1);
  });

  $(document).on('click', '.qty-minus', function () {
    var $input = $(this).siblings('.qty-input');
    var val = parseInt($input.val());
    if (val > 1) $input.val(val - 1);
  });

  //  HERO COUNTER ANIMATION 
  function animateCounter($el) {
    var target = parseInt($el.data('target'));
    var duration = 2000;
    var step = target / (duration / 16);
    var current = 0;
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      $el.text(Math.floor(current) + ($el.data('suffix') || ''));
    }, 16);
  }

  var countersAnimated = false;
  $(window).on('scroll', function () {
    if (!countersAnimated && $('.counter-num').length) {
      var wBottom = $(window).scrollTop() + $(window).height();
      var elTop = $('.counter-num').first().offset().top;
      if (wBottom > elTop) {
        countersAnimated = true;
        $('.counter-num').each(function () {
          animateCounter($(this));
        });
      }
    }
  });

  //  SMOOTH ANCHOR SCROLL 
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this).attr('href');
    if ($(target).length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top - 80
      }, 700);
    }
  });

  // SEARCH BAR TOGGLE 
  $('#searchToggle').on('click', function () {
    $('#searchBar').slideToggle(300);
    setTimeout(function () { $('#searchBar input').focus(); }, 350);
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#searchBar').slideUp(300);
    }
  });

  // MOBILE NAV CLOSE ON CLICK 
  $(document).on('click', '.navbar-velvet .nav-link', function () {
    if ($('.navbar-collapse').hasClass('show')) {
      $('.navbar-toggler').trigger('click');
    }
  });

}); // END document.ready


// linking system
document.addEventListener("DOMContentLoaded", function () {
 
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const brand = params.get("brand");

    const items = document.querySelectorAll(".product-item");

    items.forEach(item => {
        // 3. Har item se uski category aur brand lena
        const productCategory = item.getAttribute("data-category");
        const productBrand = item.getAttribute("data-brand");

        let show = true;

        if (category && category !== "all" && productCategory !== category) {
            show = false;
        }

        if (brand && brand !== "all" && productBrand !== brand) {
            show = false;
        }

        if (show) {
            item.style.setProperty('display', 'block', 'important');
            item.classList.remove("hide");
        } else {
            item.style.setProperty('display', 'none', 'important');
            item.classList.add("hide");
        }
    });
});

// form validation
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let isValid = true;

  // inputs
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let password = document.getElementById("regPassword");
  let confirm = document.getElementById("regConfirm");
  let city = document.getElementById("city");
  let terms = document.getElementById("terms");

  // clear old errors
  document.querySelectorAll(".error-msg").forEach(e => e.innerText = "");
  document.querySelectorAll(".form-control-velvet").forEach(i => {
    i.classList.remove("input-error", "input-success");
  });

  function setError(input, message) {
  input.classList.add("input-error");
  isValid = false;

  showToast(message, 'fa-exclamation-circle'); // 👈 same styling
}

  function setSuccess(input) {
    input.classList.add("input-success");
  }

  // First Name
  if (firstName.value.trim().length < 2) {
    setError(firstName, "Enter valid first name");
  } else {
    setSuccess(firstName);
  }

  // Last Name
  if (lastName.value.trim().length < 2) {
    setError(lastName, "Enter valid last name");
  } else {
    setSuccess(lastName);
  }

  // Email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    setError(email, "Enter valid email");
  } else {
    setSuccess(email);
  }

  // Phone (optional but if filled must be valid)
  let phonePattern = /^(\+92|0)[0-9]{10}$/;
  if (phone.value && !phonePattern.test(phone.value)) {
    setError(phone, "Enter valid Pakistani number");
  } else if (phone.value) {
    setSuccess(phone);
  }

  // Password
  if (password.value.length < 8) {
    setError(password, "Min 8 characters required");
  } else {
    setSuccess(password);
  }

  // Confirm Password
  if (confirm.value !== password.value) {
    setError(confirm, "Passwords do not match");
  } else {
    setSuccess(confirm);
  }

  // City
  if (city.value === "") {
    setError(city, "Select your city");
  } else {
    setSuccess(city);
  }

  // Terms
  if (!terms.checked) {
  showToast("Please accept terms & conditions", "fa-exclamation-circle");
  isValid = false;
}

  // Final submit
  if (isValid) {
  showToast("Account Created! Welcome to VelvetWrap 🎉", "fa-gift");
}
});
// eye toggler password
function togglePassword(id, btn) {
  var input = document.getElementById(id);
  var icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}