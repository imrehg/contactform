/*
VIA Embedded Contact Form
*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

(function ($) {
    "use strict";

    // Data of states and provinces
    var countryStates = {
        '1/USA' : {
            'title' : 'State',
            'areas' : {
                'Alabama (AL)': 2,
                'Alaska (AK)': 1,
                'Arizona (AZ)': 4,
                'Arkansas (AR)': 3,
                'California North (CA_N)': 5,
                'California South (CA_S)': 6,
                'Colorado (CO)': 7,
                'Connecticut (CT)': 8,
                'Delaware (DE)': 9,
                'Florida (FL)': 10,
                'Georgia (GA)': 11,
                'Hawaii (HI)': 12,
                'Idaho (ID)': 14,
                'Illinois (IL)': 15,
                'Indiana (IN)': 16,
                'Iowa (IA)': 13,
                'Kansas (KS)': 17,
                'Kentucky (KY)': 18,
                'Louisiana (LA)': 19,
                'Maine (ME)': 22,
                'Maryland (MD)': 21,
                'Massachusetts (MA)': 20,
                'Michigan (MI)': 23,
                'Minnesota (MN)': 24,
                'Mississippi (MS)': 26,
                'Missouri (MO)': 25,
                'Montana (MT)': 27,
                'Nebraska (NE)': 30,
                'Nevada (NV)': 34,
                'New Hampshire (NH)': 31,
                'New Jersey (NJ)': 32,
                'New Mexico (NM)': 33,
                'New York (NY)': 35,
                'North Carolina (NC)': 28,
                'North Dakota (ND)': 29,
                'Ohio (OH)': 36,
                'Oklahoma (OK)': 37,
                'Oregon (OR)': 38,
                'Pennsylvania (PA)': 39,
                'Rhode Island (RI)': 40,
                'South Carolina (SC)': 41,
                'South Dakota (SD)': 42,
                'Tennessee (TN)': 43,
                'Texas (TX)': 44,
                'Utah (UT)': 45,
                'Vermont (VT)': 47,
                'Virginia (VA)': 46,
                'Washington (WA)': 48,
                'West Virginia (WV)': 50,
                'Wisconsin (WI)': 49,
                'Wyoming (WY)': 51,
                'Guam': 115
            }
        },
        '3/Canada' : {
            'title' : 'Province',
            'areas' : {
                'Alberta (AB)': 85,
                'British Columbia (BC)': 86,
                'Manitoba (MB)': 87,
                'New Brunswick (NB)': 88,
                'Newfoundland and Labrador (NL)': 89,
                'Yukon (YT)': 95,
                'Ontario (ON)': 91,
                'Prince Edward Island (PE)': 92,
                'Quebec (QC)': 93,
                'Saskatchewan (SK)': 94,
                'Nova Scotia (NS)': 90
            }
        }
    },
        // Remove the dropdown menu and related parts for country area selection
        removeAreaDropdown = function () {
            var target = $("#spaState");
            target.empty();
            target.append("<input type=\"hidden\" id=\"hidStateExistFlg\" name=\"hidStateExistFlg\" value=\"0\">");
        },
        // Construct the dropdown menu and related parts for country area selection
        createAreaDropdown = function (areaInfo) {
            var target = $("#spaState"),
                newSelect = $('<select id=\"stateId\" name="stateId\">');
            target.empty();
            $.each(areaInfo.areas, function (area, val) {
                newSelect.append(
                    $('<option></option>').val(val).html(area)
                );
            });

            target.append('<label for="stateId">' + areaInfo.title + '<em>*</em></label><br>');
            target.append(newSelect);
            target.append('<input type="hidden" id="hidStateExistFlg" name="hidStateExistFlg" value="1">');
        };

    // Validation
    window.ParsleyConfig = {
        validators: {
            conditionalrequired: {
                fn: function (value, requirements) {
                    // if requirements[0] value does not meet requirements[1] expectation, field is required
                    if (requirements[1] === $(requirements[0]).val() && '' === value)
                        return false;
                    
                    return true;
                },
                priority: 32
            },
            conditionalchecked: {
                fn: function (value, checkboxId) {
                    // if requirements[0] value does not meet requirements[1] expectation, field is required
                    if ($('#' + checkboxId + ':checked').length > 0 && '' === value) {
                        return false;
                    } else {
                        return true;
                    }
                },
                priority: 33
            }
        }
    };
    
    $(document).ready(function () {

        // Visibility of States, Provinces
        $("#countryId").change(function () {
            var countrySelection = $(this).val();
            removeAreaDropdown();
            if (countryStates[countrySelection] !== undefined) {
                createAreaDropdown(countryStates[countrySelection]);
            } else {
                removeAreaDropdown();
            }
        });

        // Product selection
        $("#mb").change(function () {
            $("input#txtInProductModel").val('');
        });
        $("#txtInProductModel").focus(function () {
            $("select#mb").val(-1);
        });

        // Contact selection
        $('input[name=contactId]').change(function () {
            console.log('Contact!');
            var hide,
                fields = ['showBoughtFromInfo',
                          'showcpuInfo',
                          'showosInfo',
                          'showmemInfo',
                          'showvideoInfo'
                         ];
            if ($(this).val() === '1/Sales Contact') {
                hide = true;
            } else {
                hide = false;
            }
            $.each(fields, function (index, field) {
                $("#" + field).toggleClass("hidden", hide);
            });
        });

        $('#contactForm').parsley().subscribe('parsley:form:validate', function (formInstance) {

            if (formInstance.isValid()) {
                alert("Yay, a valid form!");
            }
            formInstance.submitEvent.preventDefault();
            return;
            // // if one of these blocks is not failing do not prevent submission
            // // we use here group validation with option force (validate even non required fields)
            // if (formInstance.isValid('block1', true) || formInstance.isValid('block2', true)) {
            //     $('.invalid-form-error-message').html('');
            //     return;
            // }
            // // else stop form submission
            // formInstance.submitEvent.preventDefault();
            
            // // and display a gentle message
            // $('.invalid-form-error-message')
            //     .html("You must correctly fill the fields of at least one of these two blocks!")
            //     .addClass("filled");
            // return;
        });
        
        // Validation
        $('#submit').click(function () {

            // Fix button remain pressed
            // See: http://stackoverflow.com/questions/3861307/jqueryui-button-remains-pressed-after-opening-ui-dialog-with-it-in-firefox
            $(this).removeClass("ui-state-focus ui-state-hover");
            
            // var firstName = $('#firstName');
            // if ($.trim(firstName.val()).length < 1) {
            //     $('body').scrollTop(firstName.offset().top);
            //     alert("Please fill in your first name!");
            //     return;
            // }

            // var lastName = $('#lastName');
            // if ($.trim(firstName.val()).length < 1) {
            //     $('body').scrollTop(firstName.offset().top);
            //     alert("Please fill in your last name!");
            //     return;
            // }
            
        });
    });

}(jQuery));
