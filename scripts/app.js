// Creating a module for the application.
// Injecting 'ngAnimate' as a sub-module into the website module.
// After injecting, the animations will be available for entire
// module.
angular.module('website', ['ngAnimate', 'ngTouch'])
	.controller('MainController', function($scope){
		//Set up the slides.
		$scope.slides = [
			{image: 'images/image1-1.jpg', description: 'Bokeh'},
			{image: 'images/image2-1.jpg', description: 'City Lights'},
			{image: 'images/image3-1.jpg', description: 'Lady under an Umbrella'}
		];
		
		$scope.direction = 'left';
		$scope.currentIndex = 0;
	
		$scope.setCurrentSlideIndex = function(index){
			$scope.currentIndex = index;
		};
	
		/* This allows us to toggle functionality in the layout
			based on the value of a function
			ng-hide generates a $index variable in html that allows us
			to refer the index of the item that is currently being 
			processed. That $index is used to coordinate with 
			currentIndex in MainController */
		$scope.isCurrentSlideIndex = function(index){
			return $scope.currentIndex === index;
		};
		
		$scope.prevSlide = function(){
			$scope.direction = 'left';
			$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
		};
		
		$scope.nextSlide = function(){
			$scope.direction = 'right';
			$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
		};
	})
	.animation('.slide-animation', function(){
		return{
			addClass: function(element, className, done){
				var scope = element.scope();
				if(className == 'ng-hide'){
					// Animation
					//TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done});
					var finishPoint = element.parent().width();
					if(scope.direction !== 'right'){
						finishPoint = -finishPoint;
					}
					TweenMax.to(element, 0.5,{left: finishPoint, backgroundColor: '#000', onComplete: done});
				} else{
					done();
				}
			},
			removeClass: function(element, className, done){
				var scope = element.scope();
				if(className == 'ng-hide'){
					// Animation
					element.removeClass('ng-hide');
					//TweenMax.set(element, {left: element.parent().width()});
					//TweenMax.to(element, 0.5, {left: 0, onComplete: done});
					var startPoint = element.parent().width();
					if(scope.direction !== 'left'){
						startPoint = -startPoint;
					}
					TweenMax.set(element, {left: startPoint});
					TweenMax.to(element, 0.5, {left: 0, onComplete: done});
				} else{
					done();
				}
			}
		};
	});