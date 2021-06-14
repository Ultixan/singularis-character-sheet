$(document).ready(function() {
    var physicalTraits = $('.physical input[name=physical]');
    var mentalTraits = $('.mental input[name=mental]');
    var socialTraits = $('.social input[name=social]');

    var traitCalc = function(traits) {
        var count = 0;
        $(traits).each(function(index, trait) {
            if (trait.checked) {
             count += 1;
            }
        });

        return count;
    }

    var athletics = $('#athletics .ability');
    var knowledge = $('#knowledge .ability');
    var persuasion = $('#persuasion .ability');
    var resistance = $('#resistance .ability');
    var awareness = $('#awareness .ability');
    var presence = $('#presence .ability');

    var calculateAbilities = function() {
        var physical = traitCalc(physicalTraits);
        var mental = traitCalc(mentalTraits);
        var social = traitCalc(socialTraits);

        let attributeCounter =   $('#counters .attributes span');
        let used = physical + mental + social;
        attributeCounter.text(6 - used);
        if (used > 6) {
          attributeCounter.parent().addClass('invalid');
          attributeCounter.parent().removeClass('valid');
        } else if (used == 6) {
          attributeCounter.parent().addClass('valid');
          attributeCounter.parent().removeClass('invalid');
        } else {
          attributeCounter.parent().removeClass('valid');
          attributeCounter.parent().removeClass('invalid');
        }

        athletics.text(physical * 10);
        knowledge.text(mental * 10);
        persuasion.text(social * 10);
        resistance.text((physical + mental) * 5);
        awareness.text((mental + social) * 5);
        presence.text((social + physical) * 5);
    };

    $('.attribute input').change(function() {
        calculateAbilities();
    });

    calculateAbilities();

    let requireInput = function(field, counter) {
      let text = field.val();
      if (text == null || text == '') {
        counter.addClass('invalid');
        counter.removeClass('valid');
      } else {
        counter.addClass('valid');
        counter.removeClass('invalid');
      }
    };

    // Text input areas just need something populated
    $('#name_block').change(function() {
      requireInput($('#name_block'), $('#counters .name'));
    });
    $('#schtick_block').change(function() {
      requireInput($('#schtick_block'), $('#counters .schtick'));
    });
    $('#description_block').change(function(event) {
      requireInput($('#description_block'), $('#counters .description'));
    });
});
