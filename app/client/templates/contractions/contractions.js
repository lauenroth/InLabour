Meteor.subscribe('myContractions');

/*****************************************************************************/
/* Contractions: Event Handlers */
/*****************************************************************************/
Template.Contractions.events({

  'click .button': function(e) {

    var ticker = $('.ticker');
    var label = $('.ticker-label');

    if (label.text() === 'Start') {

      Session.set('currentDuration', 0);
      var currentTicker = setInterval(function() {
        Session.set('currentDuration', Session.get('currentDuration') + 1);
      }, 1000);
      Session.set('currentTicker', currentTicker);
      label.text('Stop');

      ticker.addClass('running');
    }

    else {
      clearInterval(Session.get('currentTicker'));
      var duration = Session.get('currentDuration');
      var now = new Date();
      Contractions.insert({
        ended: now, 
        duration: duration,
        userId: Meteor.userId()
      });
      Session.set('currentDuration', 0);
      delete Session.keys.currentTicker;
      label.text('Start');
      ticker.removeClass('running');
    }

    return false;
  },

  'click .timeframe li': function(e) {
    Session.set('contractionsTimeframe', $(e.currentTarget).text());
  }

});

secondsToTime = function(time) {
  if (!time || time === 0) {
      return '0:00';
    }
    if (time < 10) {
      return '0:0' + time;
    }
    if (time < 60) {
      return '0:' + time;
    }
    else {
      var seconds = time % 60;
      var minutes = Math.floor(time / 60);
      var hours = (minutes >= 60 ? Math.floor(minutes / 60) : 0);
      minutes -= 60 * hours;
      
      return (hours > 0 ? hours + ':' + (minutes < 10 ? '0' : '') : '') + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
};

/*****************************************************************************/
/* Contractions: Helpers */
/*****************************************************************************/
Template.Contractions.helpers({

  timeframes: function() {
    return ['30min', '60min', '120min', 'all'];
  },

  isSelectedTimeframe: function(timeframe) {
    return (
      timeframe === (Session.get('contractionsTimeframe') || 'all')) ? 'selected' : '';
  },

  currentDuration: function() {
    var currentDuration = Session.get('currentDuration');
    return secondsToTime(currentDuration);
  },

  pastContractions: function() {
    var contractionsTmp = [];
    var timeframe = Session.get('contractionsTimeframe');
    var contractions = null;
    if (timeframe && timeframe !== 'all') {
      
      var dateTmp = null;
      switch (timeframe) {
        case '30min':
          dateTmp = moment().subtract(30, 'minutes');
          break;
        case '60min':
          dateTmp = moment().subtract(60, 'minutes');
          break;
        case '120min':
          dateTmp = moment().subtract(120, 'minutes');
          break;
      }
      contractions = Contractions.find({ended: {$gte: dateTmp.toDate()} }, {sort: {ended: 1} });
    }
    else {
      contractions = Contractions.find({}, {sort: {ended: 1} });
    }
    
    var previousContractionStarted = null;
    var durations = [];
    var frequencies = [];
    

    contractions.forEach(function(contraction, index) {
      
      var started = moment(contraction.ended).subtract(contraction.duration, 's');
      var ended = moment(contraction.ended);
      var duration = secondsToTime(contraction.duration);

      durations.push(contraction.duration);


      var frequency = false;
      if (previousContractionStarted) {
        frequency = started.diff(previousContractionStarted, 's');
        frequencies.push(frequency);
        frequency = secondsToTime(frequency);
      }

      previousContractionStarted = started;

      contractionsTmp.push({
        _id: contraction._id,
        started: {
          time: started.format('HH:mm'),
          date: started.format('D/M/YYYY')
        },
        ended: ended.format('HH:mm'),
        duration: duration,
        frequency: frequency
      });
    });

    var durationsTotal = 0;
    for (var i = durations.length - 1; i >= 0; i--) {
      durationsTotal += durations[i];
    }

    var frequenciesTotal = 0;
    for (var i = frequencies.length - 1; i >= 0; i--) {
      frequenciesTotal += frequencies[i];
    }

    Session.set('tickerAverages', {
      duration: secondsToTime(Math.round(durationsTotal / durations.length)),
      frequency: secondsToTime(Math.round(frequenciesTotal / frequencies.length))
    });

    return contractionsTmp.reverse();
  },

  tickerAverages: function() {
    return Session.get('tickerAverages');
  }

});

/*****************************************************************************/
/* Contractions: Lifecycle Hooks */
/*****************************************************************************/
Template.Contractions.created = function () {
  Session.set('path', '/');
};

Template.Contractions.rendered = function () {

  $('#main').tabbedContent();
  
};

Template.Contractions.destroyed = function () {
};
