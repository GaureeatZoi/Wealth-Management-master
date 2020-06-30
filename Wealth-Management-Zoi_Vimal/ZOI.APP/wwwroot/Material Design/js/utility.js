function getAjax(u, d, sh, eh) {
    if (typeof (showLoadingBox) == "function")
        showLoadingBox();
    $.ajax({
        type: "GET",
        url: u,
        data: d,
        success: function (response, status, xhr) {
            if (typeof (hideLoadingBox) == "function")
                hideLoadingBox();
            var ct1 = xhr.getResponseHeader("content-type") || "";
            var ct = '';
            if (ct1.indexOf('html') > -1) {
                ct = 'html';
            }
            else if (ct1.indexOf('json') > -1) {
                ct = 'json';
            }
            if (sh)
                sh(response, ct);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (eh)
                eh(xhr, ajaxOptions, thrownError);
        }
    });
}

function getAjaxWithLoader(u, d, sh, eh,loader_class) {
    if (typeof (showLoadingBox) == "function")
        showLoadingBox();
    $.ajax({
        type: "GET",
        url: u,
        data: d,
        beforeSend: function () {
            loader_class.show();
        },
        complete: function () {
            loader_class.hide();
        },
        success: function (response, status, xhr) {
            if (typeof (hideLoadingBox) == "function")
                hideLoadingBox();
            var ct1 = xhr.getResponseHeader("content-type") || "";
            var ct = '';
            if (ct1.indexOf('html') > -1) {
                ct = 'html';
            }
            else if (ct1.indexOf('json') > -1) {
                ct = 'json';
            }
            if (sh)
                sh(response, ct);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (eh)
                eh(xhr, ajaxOptions, thrownError);
        }
    });
}

function postform(url, data, callback) {
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function (result) {
            if (callback != null) {
                callback(result);
            }
        },
        error: function (a, b, c) {
            showMessage('Some error occured. Please try again.', false);
        }
    });
}

function postAjax(u, d, sh, eh) {
    if (typeof (showLoadingBox) == "function")
        showLoadingBox();
    $.ajax({
        type: "POST",
        url: u,
        data: d,
        cache: false,
        success: function (response, status, xhr) {
            if (typeof (hideLoadingBox) == "function")
                hideLoadingBox();
            var ct1 = xhr.getResponseHeader("content-type") || "";
            var ct = '';
            if (ct1.indexOf('html') > -1) {
                ct = 'html';
            }
            else if (ct1.indexOf('json') > -1) {
                ct = 'json';
            }
            if (sh)
                sh(response, ct);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (eh)
                eh(xhr, ajaxOptions, thrownError);
        }
    });
}

function postAjaxWithTraditional(u, d, sh, eh) {
    if (typeof (showLoadingBox) == "function")
        showLoadingBox();
    $.ajax({
        type: "POST",
        url: u,
        data: d,
        cache: false,
        traditional: true,
        success: function (response, status, xhr) {
            if (typeof (hideLoadingBox) == "function")
                hideLoadingBox();
            var ct1 = xhr.getResponseHeader("content-type") || "";
            var ct = '';
            if (ct1.indexOf('html') > -1) {
                ct = 'html';
            }
            else if (ct1.indexOf('json') > -1) {
                ct = 'json';
            }
            if (sh)
                sh(response, ct);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (eh)
                eh(xhr, ajaxOptions, thrownError);
        }
    });
}

$.fn.extend({
    bindDataTable: function (dataTableConfigurations, FilterOnReturn, tableid) {
        var table = $(this).DataTable(dataTableConfigurations);
        if (FilterOnReturn) {
            $("input[type='search'][aria-controls='" + tableid + "']").unbind().bind('keyup', function (e) {
                //if (e.keyCode == 13) {
                table.search(this.value).draw();
                // }
                // else {
                //  return;
                // }
            });
        }
        return table;
    }
});

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            //if name has .Index then allow to make array
            if (endsWith(this.name, '.Index') || endsWith(this.name, '.index') || endsWith(this.name, '_mselIndex')) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                //do nothing
            }

        } else {
            o[this.name] = (this.value || '');
        }
    });
    return o;
};

//re-set all client validation 
$.fn.resetValidation = function () {

    //var $form = this.closest('form');
    var $form = this

    //reset jQuery Validate's internals
    $form.validate().resetForm();

    //reset unobtrusive validation summary, if it exists
    $form.find("[data-valmsg-summary=true]")
        .removeClass("validation-summary-errors")
        .addClass("validation-summary-valid")
        .find("ul").empty();

    //reset unobtrusive field level, if it exists
    $form.find("[data-valmsg-replace]")
        .removeClass("field-validation-error")
        .addClass("field-validation-valid")
        .empty();

    return $form;
};

function showMessage(message, isSuccess) {
    $("#alertMessage").removeClass("text-danger").removeClass("text-success");
    if (isSuccess) {
        $("#alertMessage").addClass("text-success").text(message);
    }
    else {
        $("#alertMessage").addClass("text-danger").text(message);
    }
    $("#alertMessageModal").modal("show");
}

function date_range_year(from_field_id, to_field_id) {
    $('#' + from_field_id).datepicker({
        format: 'dd-M-yyyy',
        endDate: 0,
        autoclose: true,
        minViewMode: "date",
    }).on('changeDate', function (selected) {
        startDate = $("#" + from_field_id).val();
        $('#' + to_field_id).datepicker('setStartDate', "" + startDate);
    });
    $('#' + to_field_id).datepicker({
        format: 'dd-M-yyyy',
        endDate: 0,
        autoclose: true,
        minViewMode: "date",
    }).on('changeDate', function (selected) {
        endDate = $("#" + to_field_id).val();
        $('#' + from_field_id).datepicker('setEndDate', "" + endDate);
    });

    endDate = $("#" + to_field_id).val();
    $("#" + from_field_id).datepicker('endDate', "" + (parseInt(endDate)));

    startDate = $("#" + from_field_id).val();
    $("#" + to_field_id).datepicker('startDate', "" + (parseInt(startDate)));
}

function date_range_future(from_field_id, to_field_id) {
    $('#' + from_field_id).datepicker({
        format: 'dd-M-yyyy',
        startDate: 0,
        autoclose: true,
        minViewMode: "date",
    }).on('changeDate', function (selected) {
        startDate = $("#" + from_field_id).val();
        $('#' + to_field_id).datepicker('setStartDate', "" + startDate);
    });
    $('#' + to_field_id).datepicker({
        format: 'dd-M-yyyy',
        startDate: 0,
        autoclose: true,
        minViewMode: "date",
    }).on('changeDate', function (selected) {
        endDate = $("#" + to_field_id).val();
        $('#' + from_field_id).datepicker('setEndDate', "" + endDate);
    });

    endDate = $("#" + to_field_id).val();
    $("#" + from_field_id).datepicker('endDate', "" + (parseInt(endDate)));

    startDate = $("#" + from_field_id).val();
    $("#" + to_field_id).datepicker('startDate', "" + (parseInt(startDate)));
}

function fillDropdown(select, data) {
    select.empty();
    $.each(data, function (index, itemData) {
        select.append($('<option/>', {
            value: itemData.Value,
            text: itemData.Text
        }));
    });
    //select.trigger("refresh");
    //select.selectpicker("refresh");
}

function fill_selectpicker_withvalue(select, data, value) {
    select.empty();
    $.each(data, function (index, item) {
        select.append('<option value=' + item.value + ">" + item.text + "</option >");
        select.val(value);
    });
    select.trigger("refresh");
    select.selectpicker("refresh");
}

//Created By Denis
//This Function Should be All list and Select value

//function fill_selectpicker_withselectvalue(select, data) {
//    select.val("0");
//    $.each(data, function (index, item) {
//        select.val(item.value);
//    });
//}

function fillDropdownWithoutSelect(select, data) {
    select.empty();
    $.each(data, function (index, itemData) {
        select.append($('<option/>', {
            value: itemData.Value,
            text: itemData.Text
        }));
    });
    select.trigger("refresh");
    select.selectpicker("refresh");
}

function fill_selectpicker(select, data) {
    select.empty();
    $.each(data, function (index, itemData) {
        select.append($('<option/>', {
            value: itemData.value,
            text: itemData.text
        }));
    });
    select.trigger("refresh");
    select.selectpicker("refresh");
}

function fillDropdownMultiSelect(select, data) {
    select.empty();
    $.each(data, function (index, itemData) {
        select.append($('<option/>', {
            value: itemData.Value,
            text: itemData.Text
        }));
    });
    select.trigger("refresh");
    select.selectpicker("refresh");
}

function Numeric(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet == 8 || keyGet == 0)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function Decimal(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 46)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphabetsWithoutSpaceWithHyphen(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 45)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}


function AlphabetWithoutSpace(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphaNumeric(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if (keyGet > 96 && keyGet < 123)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphaNumericWithSpace(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if (keyGet > 96 && keyGet < 123)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 32)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphaNumericWithSpaceWithDot(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if (keyGet > 96 && keyGet < 123)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 32 || keyGet == 46 )
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphabetsWithSpace(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }
    if (keyGet > 64 && keyGet < 91)
        return;
    else if (keyGet > 96 && keyGet < 123)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 32)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphabetsWithSpaceWithSpecial(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 64 && keyGet < 91)
        return;
    else if (keyGet > 96 && keyGet < 123)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 32 || keyGet == 45)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

//Abu

function AlphaNumericWithSpaceWithHypen(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if ((keyGet > 96 && keyGet < 123) || keyGet == 45)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 32)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphaNumericWithSpaceWithHypenSlash(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 46 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if ((keyGet > 96 && keyGet < 123) || keyGet == 45)
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127 || keyGet == 32 || keyGet == 95)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphaNumericWithHypen(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if ((keyGet > 96 && keyGet < 123))
        return;
    else if (keyGet == 8 || keyGet == 0 || keyGet == 127|| keyGet == 46 || keyGet == 32)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}

function AlphaNumericWithHyphenAndColon(evtGet) {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        var keyGet = evtGet.keyCode;
    }
    else {
        var keyGet = evtGet.which;
    }

    if (keyGet > 47 && keyGet < 58)
        return;
    else if (keyGet > 64 && keyGet < 91)
        return;
    else if (keyGet > 96 && keyGet < 123)
        return;
    else if (keyGet == 58 || keyGet == 27 || keyGet == 45 || keyGet==0)
        return;
    else if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox")
        window.event.returnValue = null;
    else
        evtGet.preventDefault();
}


function autocomplete_typehead(request, response, url) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: "{'SearchText':'" + request + "'}",
        dataType: "json",
        success: function (data) {
            if (data[0] === undefined) {
                return false;
            }
            var array = [];
            map = {};
            var abc = [];
            $.each(data, function (i, item) {
                array.push({ id: item.id, name: item.text });
            });
            response(array);
        }
    });
}

function show_modal_dialog(title, message, html_content, show_button_layer, button1_name, button1_click_event_handler, button2_name, button2_click_event_handler, button3_name, button3_click_event_handler) {
    $('#modal-header-name').html(title);

    if (message) {
        $('#modal-body-content').html('<div class="col-sm-12" style="text-align:center"><span>' + message + '</span></div>');
    }
    if (html_content) {
        $('#modal-body-content').html(html_content);
    }

    if (show_button_layer) {
        $('#modal-button-layer').show();
    } else {
        $('#modal-button-layer').hide();
    }

    if (button1_name) {
        $('#modal-button-one > span').html(button1_name);
        $('#modal-button-one').show();
    }
    else {
        $('#modal-button-one').hide();
    }

    if (button2_name) {
        $('#modal-button-two > span').html(button2_name);
        $('#modal-button-two').show();
    }
    else {
        $('#modal-button-two').hide();
    }

    if (button3_name) {
        $('#modal-button-three > span').html(button3_name);
        $('#modal-button-three').show();
    }
    else {
        $('#modal-button-three').hide();
    }

    $('#modal-button-one').off('click');
    if (button1_click_event_handler) {
        $('#modal-button-one').click(function () { button1_click_event_handler() });
    }

    $('#modal-button-two').off('click');
    if (button2_click_event_handler) {
        $('#modal-button-two').click(function () { button2_click_event_handler() });
    }

    $('#modal-button-three').off('click');
    if (button3_click_event_handler) {
        $('#modal-button-three').click(function () { button3_click_event_handler() });
    }

    $('#modal-box').modal({ backdrop: 'static', keyboard: false })
}

function hide_modal_dialog() {
    $('#modal-box').modal('hide');
    //event.preventDefault()
}
/* States of Tosatrs
    1) info
    2) error
    3) warning
    4) success
*/
function toastr_message(state, message) {
    toastr.clear();
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.debug = false;
    toastr.options.positionClass = 'toast-bottom-left';
    toastr.options.showDuration = 333;
    toastr.options.hideDuration = 333;
    toastr.options.timeOut = 4000;
    toastr.options.extendedTimeOut = 4000;
    toastr.options.showEasing = 'swing';
    toastr.options.hideEasing = 'swing';
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr[state](message, '');
}

function validateTimeDiffFor15Min(fromtime, totime) {

    var parseFromtime = (fromtime).split(':');
    var parseTotime = (totime).split(':');

    var AddMin = new Date(0, 0, 0, parseFromtime[0], parseFromtime[1], 0, 0);
    var newMin = AddMin.getMinutes() + 15;
    var nowdate = new Date();
    var months = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 };
    var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var final = curr_date + "-" + m_names[curr_month]
        + "-" + curr_year;
    var parsedate = (final).split('-');

    var selectedFromtime = new Date(parsedate[2], months[parsedate[1]] - 1, parsedate[0], parseFromtime[0], parseFromtime[1], 0, 0);
    var selectedTotime = new Date(parsedate[2], months[parsedate[1]] - 1, parsedate[0], parseTotime[0], parseTotime[1], 0, 0);

    var selectedNewTotime = new Date(parsedate[2], months[parsedate[1]] - 1, parsedate[0], parseFromtime[0], newMin, 0, 0);

    var difference_ms = Math.abs(selectedTotime - selectedFromtime);
    if (selectedFromtime <= selectedTotime && selectedTotime < selectedNewTotime) {
        return false;
    }
    else {
        return true;
    }
}

function daterange(formdate, todate) {
    var meeting_date = new Date(today_date.getFullYear(), today_date.getMonth() + 6, today_date.getDate())
    $(formdate).addClass('floating-label dirty');
    $(todate).addClass('floating-label dirty');
    $(todate).val($(formdate).val());
    $(todate).datepicker('remove');
    $(todate).datepicker({ format: 'dd-M-yyyy', startDate: $(formdate).val(), autoclose: true, endDate: meeting_date });
    $(todate).datepicker('update');
}

function Checkfiles() {
    var fup = document.getElementById('file_image');
    var fileName = fup.value;
    var ext = fileName.substring(fileName.lastIndexOf('.'));
    if (ext == ".gif" || ext == ".GIF" || ext == ".PNG" || ext == ".png" || ext == ".jpg" || ext == ".JPG" || ext == ".SVG" || ext == ".svg") {
        for (var i = 0; i <= fup.files.length - 1; i++) {
            var fsize = fup.files.item(i).size;
            var file = Math.round((fsize / 1024));
            if (file <= 8192) {
                flag = true;
            }
            else {
                fup.focus();
                flag = false;
            }
        }
    }
    else {
        fup.focus();
        flag = false;
    }
}

function is_string_empty(value) {
    if (value == null || value == undefined) {
        return true;
    } else {
        return false;
    }
}

function apply_remove_class_is_empty(control, value) {
    if (value == null || value == undefined) {
        control.parent().addClass("is-empty");
    } else {
        control.parent().removeClass("is-empty");
    }
}

/* Code for Configure UI */
function is_json_array_empty(json_array) {
    if (json_array != null && json_array.length > 0) {
        return false;
    } else {
        return true;
    }
}

//only for material design
$(document).on("blur", "input[type=text]", function () {
    apply_remove_class_is_empty($(this), $(this).val());
});

function reset_text(current_item) {
    current_item.val('');
    apply_remove_class_is_empty(current_item, current_item.val());
}

function is_minlength_proper(current_item, length) {
    if (current_item.trim().length < length) {
        return false;
    } else {
        return true;
    }
}

function is_duplicate_in_array(array, value) {
    var check = true;
    console.log(array);
    $.each(array, function (i,item) {
        if (item == value.trim()) {
            check = false;
            return check;
        }
    });
    return check;
}

$.fn.serialize_inputs = function () {
    var o = {};
    var a = this.find("input").serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            //if name has .Index then allow to make array
            if (endsWith(this.name, '.Index') || endsWith(this.name, '.index') || endsWith(this.name, '_mselIndex')) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                //do nothing
            }

        } else {
            o[this.name] = (this.value || '');
        }
    });
    return o;
};

function get_key_identify(event, action) {
    var browser = navigator.appName;
    var keyGet;
    if (browser == "Microsoft Internet Explorer" || browser == "Mozilla Firefox") {
        keyGet = event.keyCode;
    } else {
        keyGet = event.which;
    }
    if (action)
        action(keyGet);
}

function init_selectpicker() {
    $('.selectpicker').selectpicker({
        container: 'body',
        dropupAuto: false
    });
}

function reset_selectpicker(select) {
    select.val("");
    select.trigger("refresh");
    select.selectpicker("refresh");
}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};