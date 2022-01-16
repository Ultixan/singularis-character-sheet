$(document).ready(function() {
    let characters = JSON.parse(localStorage.getItem("characters-beta3") || "{}");
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

    let skillNames = [
      'athletics',
      'knowledge',
      'persuasion',
      'resistance',
      'awareness',
      'presence'
    ];

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

        setValues(athletics, athleticsTalent, physical * 2);
        setValues(knowledge, knowledgeTalent, mental * 2);
        setValues(persuasion, persuasionTalent, social * 2);
        setValues(resistance, resistanceTalent, (physical + mental));
        setValues(awareness, awarenessTalent, (mental + social));
        setValues(presence, presenceTalent, (social + physical));
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
        return false;
      } else {
        counter.addClass('valid');
        counter.removeClass('invalid');
        return true;
      }
    };

    let saveData = function() {
      if (!requireInput($('#name_block'), $('#counters .name'))) {
        return;
      }
      let physical = traitCalc(physicalTraits);
      let mental = traitCalc(mentalTraits);
      let social = traitCalc(socialTraits);
      let attributes = {
        "physical": physical,
        "mental": mental,
        "social": social
      }
      let talents = skillNames.reduce((acc, skill) => {
        acc[skill] = $(`#${skill} .name`).val();
        return acc
      }, {});
      let name = $('#name_block').val();
      let character = {
        "name": name,
        "description": $('#description_block').val(),
        "signatureTalent": $('#schtick_block').val(),
        "attributes": attributes,
        "talents": talents,
        "perks": $('#perks_container .section').val(),
        "penalties": $('#penalties_container .section').val()
      };
      characters[name] = character;
      localStorage.setItem("characters-beta3", JSON.stringify(characters));
      loadData();
    };

    let loadCharacter = function(name) {
      let character = characters[name];
      $('#name_block').val(character['name']);
      $('#schtick_block').val(character['signatureTalent']);
      $('#description_block').val(character['description']);
      $('#perks_container .section').val(character['perks']);
      $('#penalties_container .section').val(character['penalties']);
      Object.entries(character['talents']).forEach(entry => $(`#${entry[0]} .name`).val(entry[1]));
      Object.entries(character['attributes']).forEach(entry => {
        $(`#attribute_block .${entry[0]} attribute-point`).each(function (index, attribute) {
          if (index < entry[1]) {
            $(attribute).attr('checked', 'checked');
          } else {
            $(attribute).removeAttr('checked');
          }
        });
      });
      calculateAbilities();
    };

    let loadData = function() {
      let charList = $('#character-list');
      charList.empty();
      Object.keys(characters).forEach(name => {
        let character = $('<li/>');
        let charName = $('<div/>');
        let loadButton = $('<button>Load</button>');
        let deleteButton = $('<button>Delete</button>');
        charName.text(name);
        character.append(charName);
        character.append(loadButton);
        character.append(deleteButton);
        charList.append(character);

        loadButton.click(function() {loadCharacter(name)});
        deleteButton.click(function() {
          delete characters[name];
          // Data is compatible with beta 3, so share characters between them.
          localStorage.setItem("characters-beta3", JSON.stringify(characters));
          loadData();
        });
      });
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

    $('#save-button').click(function() {
      saveData();
    });

    $('#destiny_track .destiny-doom').click(function(event) {
      let slot = $(event.currentTarget);
      slot.toggleClass('doom');
    });

    loadData();
});
