(function ($) {

	'use strict';

	// ------------------------------------------------------- //
	// Circle Orders
	// ------------------------------------------------------ //
	$('.circle-orders').circleProgress({
		value: 0.43,
		size: 120,
		startAngle: -Math.PI / 2,
		thickness: 6,
		lineCap: 'round',
		emptyFill: '#e4e8f0',
		fill: {
			gradient: ['#0087a4', '#08a6c3']
		}
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('.percent-orders').html(Math.round(43 * progress) + '<i>%</i>');
	});

    // ------------------------------------------------------- //
    // Calendar
    // ------------------------------------------------------ //
	$(function() {
		// page is ready
		$('#demo-calendar').fullCalendar({
			// emphasizes business hours
			businessHours: true,
			defaultView: 'month',
			// event dragging & resizing
			editable: true,
			// header
			header: {
				left: 'title',
				center: 'month,agendaWeek,agendaDay',
				right: 'today prev,next'
			},
			events: [
				{
					title: 'Barber',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-05',
					end: '2018-09-05',
					className: 'fc-bg-default',
					icon : "scissors"
				}, 
				{
					title: 'Flight Paris',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-08T14:00:00',
					end: '2018-09-08T20:00:00',
					className: 'fc-bg-violet',
					icon : "plane",
					allDay: false
				},
				{
					title: 'Team Meeting',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-10T13:00:00',
					end: '2018-09-10T16:00:00',
					className: 'fc-bg-orange',
					icon : "group",
					allDay: false
				},
				{
					title: 'Meeting',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-12',
					className: 'fc-bg-orange',
					icon : "suitcase"
				},
				{
					title: 'Conference',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-13',
					end: '2018-09-15',
					className: 'fc-bg-violet',
					icon : "calendar"
				}, 
				{
					title: 'Baby Shower',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-13',
					end: '2018-09-14',
					className: 'fc-bg-default',
					icon : "child"
				},
				{
					title: 'Birthday',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-13',
					end: '2018-09-14',
					className: 'fc-bg-default',
					icon : "birthday-cake"
				}, 
				{
					title: 'Restaurant',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-15T09:30:00',
					end: '2018-09-15T11:45:00',
					className: 'fc-bg-default',
					icon : "glass",
					allDay: false
				},
				{
					title: 'Dinner',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-15T20:00:00',
					end: '2018-09-15T22:30:00',
					className: 'fc-bg-default',
					icon : "cutlery",
					allDay: false
				},
				{
					title: 'Shooting',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-25',
					end: '2018-09-25',
					className: 'fc-bg-blue',
					icon : "camera"
				},
				{
					title: 'Go Space :)',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-27',
					end: '2018-09-27',
					className: 'fc-bg-default',
					icon : "rocket"
				},
				{
					title: 'Dentist',
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
					start: '2018-09-29T11:30:00',
					end: '2018-09-29T012:30:00',
					className: 'fc-bg-blue',
					icon : "medkit",
					allDay: false
				}
			],
			eventRender: function(event, element) {
				if(event.icon){          
					element.find(".fc-title").prepend("<i class='la la-"+event.icon+"'></i>");
				}
			  },
			eventClick: function(event, jsEvent, view) {
			        $('.event-icon').html("<i class='la la-"+event.icon+"'></i>");
					$('.event-title').html(event.title);
					$('.event-body').html(event.description);
					$('.eventUrl').attr('href',event.url);
					$('#modal-view-event').modal();
			},
		})
	});
	
    // ------------------------------------------------------- //
    // Files
    // ------------------------------------------------------ //
	$('.widget20').owlCarousel({
		dots: true,
		nav: false,
		loop: true,
		responsiveClass:true,
		navText: ['<i class="la la-angle-left" aria-hidden="true"></i>', '<i class="la la-angle-right" aria-hidden="true"></i>'],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:2
			}
		}
	});

})(jQuery);