/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Functionality on the networks page.
 */
/* global store:false */


$(document).ready(function() {
  'use strict';

  var $notification = $('#notification');
  $notification.$wrapper = $notification.parent();
  $notification.$textError = $notification.find('.text-error');
  $notification.$textCost = $notification.find('.text-cost');
  var $select = $('.select-class');
  var settings = {};

  if (!store.enabled) {
    $('#alert-store').show();
  }

  $('#panel-settings input[type="checkbox"]').each(function() {
    var $this = $(this);
    var settingKey = $this.data('setting');
    var storeSettingKey = 'settings.' + settingKey;
    var defaultState = $this.is(':checked');
    var updateState = function(state) {
      settings[settingKey] = state;
    };

    updateState(defaultState);

    if (store.enabled) {
      var state = store.get(storeSettingKey);
      if (typeof state === 'boolean') {
        updateState(state);
      }
    }

    $this.bootstrapSwitch({
      size: 'mini',
      onText: 'YES',
      offText: 'NO',
      state: settings[settingKey]
    });

    $this.on('switchChange.bootstrapSwitch', function(evt, state) {
      if (store.enabled) {
        store.set(storeSettingKey, state);
      }
      updateState(state);
    });
  });

  $select.on('change', function() {
    return tableActivate(this);
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
    var selects = $(this).find('.select-class');
    if (selects.length === 0) return;
    return tableActivate(selects[0]);
  });

  function tableActivate(select) {
    var $option = $($(select).find('option:selected')[0]);
    $('.tab-pane.active .table-ranges.active').removeClass('active');
    $($option.data('table')).addClass('active');
  }

  $('form.cost-calculation').each(function() {
    var $form = $(this);

    // add a 'submit' handler that calculates the cost
    $form.submit(function(evt) {
      if (!settings.onclient) {
        return true;
      }

      evt.preventDefault();
      var parameterArray = $form.serializeArray();
      var parameters = {};
      var cost;

      parameterArray.forEach(function(param) {
        parameters[param.name] = param.value;
      });

      try {
        cost = window.mmtcmath.calculate(window.network, parameters);
        notify(cost);
      } catch(ex) {
        var message = ex.message;
        // capitalize the message
        message = message.charAt(0).toUpperCase() + message.slice(1);
        notify(message, false);
      }
    });
  });

  function notify(message, success) {
    if (typeof success === 'undefined') {
      success = true;
    }

    $notification.$wrapper.addClass('no-display');
    $notification.removeClass('alert-danger alert-success');

    if (success) {
      $notification.$textCost.text(message);
      $notification.addClass('alert-success');
    } else {
      $notification.$textError.text(message);
      $notification.addClass('alert-danger');
    }

    setTimeout(function() {
      $notification.$wrapper.addClass('animated bounceIn')
        .removeClass('no-display');
    }, 0);
  }
});
