$(document).ready(function() {
    var physicalTraits = $('.physical attribute-point');
    var mentalTraits = $('.mental attribute-point');
    var socialTraits = $('.social attribute-point');

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
    var athleticsTalent = $('#athletics .value');
    var knowledge = $('#knowledge .ability');
    var knowledgeTalent = $('#knowledge .value');
    var persuasion = $('#persuasion .ability');
    var persuasionTalent = $('#persuasion .value');
    var resistance = $('#resistance .ability');
    var resistanceTalent = $('#resistance .value');
    var awareness = $('#awareness .ability');
    var awarenessTalent = $('#awareness .value');
    var presence = $('#presence .ability');
    var presenceTalent = $('#presence .value');

    var talentValue = 2;

    var setValues = function(skill, talent, skillValue) {
      skill.text(skillValue);
      if (talentValue == 0) {
        talent.addClass('hide');
      } else {
        talent.text(skillValue * talentValue);
        talent.removeClass('hide');
      }
    }

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

        setValues(athletics, athleticsTalent, physical * 10);
        setValues(knowledge, knowledgeTalent, mental * 10);
        setValues(persuasion, persuasionTalent, social * 10);
        setValues(resistance, resistanceTalent, (physical + mental) * 5);
        setValues(awareness, awarenessTalent, (mental + social) * 5);
        setValues(presence, presenceTalent, (social + physical) * 5);
    };

    $('input[name=talent-style]').change(function() {
      talentValue = parseInt($('input[name=talent-style]:checked').val());
      calculateAbilities();
    })

    $('.attribute attribute-point').change(function() {
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
