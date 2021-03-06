function number_validation(){
    $(".numericOnly").bind('keypress',function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    $(".floatOnly").bind('keypress',function (e) {
        if (String.fromCharCode(e.keyCode).match(/^[0-9]*.?[0-9]*$/g)) return false;
    });
}

$(document).ready(function(){

    //dynamic table for Bohrungen
    var grant_other_expenses_counter = 0;
    if($('#grant_other_expenses')){
        $("#addGrantOtherExpensesRow").on("click", function () {
            var newRow = $("<tr>");
            var cols = "";

            cols += '<td><input type="number" class="form-control numericOnly bohrungen_line" name="num_1" value="20"/></td>';
            cols += '<td><input type="number" class="form-control numericOnly" name="num_2" value="18"/></td>';
            cols += '<td><input type="number" class="form-control numericOnly" name="num_3" value="18"/></td>';

            cols += '<td><input type="button" class="ibtnGOEIDel btn btn-md btn-danger "  value="Delete"></td>';
            newRow.append(cols);
            $("table#grant_other_expenses.order-list").append(newRow);
            grant_other_expenses_counter++;
            number_validation();
            price = priceCalculation(1)
            if(price){
                $('#list_price_span').html(price)
                $('#price_unit').val(price)
            }
        });
    }
    $("table.order-list").on("click", ".ibtnGOEIDel", function (event) {
        $(this).closest("tr").remove();
        price = priceCalculation(1)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    });

    $(document).on('change', '.bohrungen_line', function(){
        price = priceCalculation(1)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    })

    // Load time product cost calculation
    if($('#list_price').length){
        price = priceCalculation(1)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    }

    // Main priceCalculation Function
    function priceCalculation(shape) {
        var list_price = $('#list_price').val()
        console.log("================priceCalculation========priceCalculation=============",list_price)

        bohrungen_price = 0
        console.log("================bohrungen_price=====BEFORE========",bohrungen_price)
        $('#grant_other_expenses tbody tr').each(function(){
            hole_size = parseInt($(this).find('td input[name="num_1"]').val());
            console.log("================hole_size===========",hole_size)
            if(hole_size>0 && hole_size<=20){
                bohrungen_price += 7
            }
            else if(hole_size>=21 && hole_size<=40){
                bohrungen_price += 12
            }
            else if(hole_size>40){
                bohrungen_price += 18
            }
        });
        console.log("================bohrungen_price=====AFTER========",bohrungen_price)

        if(shape == 1){
            console.log("================priceCalculation=======1=====")
            var width_shape_1 = $('#width_shape_1').val()
            var height_shape_1 = $('#height_shape_1').val()
            var list_price = $('input[name="special_size"]:checked').attr('price');
            console.log("================priceCalculation=======1===list_price=====NEW=============",list_price)
            if(width_shape_1 && height_shape_1 && list_price){
                var calculation = (((parseInt(width_shape_1)*parseInt(height_shape_1))/1000000)*parseInt(list_price))
                var theakness = $('input[name="special_size"]:checked').val();
                console.log("================theakness============",theakness)
                if(theakness){
                    var weight_shape_1 = ((parseInt(width_shape_1) * parseInt(height_shape_1) * parseInt(theakness) * (2.5))/1000000)
                    $('#weight_shape_1').val(weight_shape_1)
                    $('#area_shape_1').val((parseInt(width_shape_1) * parseInt(height_shape_1))/1000000)
                }
                return calculation + bohrungen_price
            }
            else{
                return false
            }
        }
        else if(shape == 2){
            var width_shape_2 = $('#width_shape_2').val()
            var height_shape_2 = $('#height_shape_2').val()
            if(width_shape_2 && height_shape_2 && list_price){
                var calculation = (((parseInt(width_shape_2)*parseInt(height_shape_2))/1000000)*parseInt(list_price))
                var weight_shape_2 = ((parseInt(width_shape_2)*parseInt(height_shape_2))/1000000)
                $('#weight_shape_2').val(weight_shape_2)
                return calculation + bohrungen_price
            }
            else{
                return false
            }
        }
        else if(shape == 3){
            var width_shape_3 = $('#width_shape_3').val()
            var height_shape_3 = $('#height_shape_3').val()
            if(width_shape_3 && height_shape_3 && list_price){
                var calculation = (((parseInt(width_shape_3)*parseInt(height_shape_3))/1000000)*parseInt(list_price))
                var weight_shape_3 = ((parseInt(width_shape_3)*parseInt(height_shape_3))/1000000)
                $('#weight_shape_3').val(weight_shape_3)
                return calculation + bohrungen_price
            }
            else{
                return false
            }
        }
        else if(shape == 4){
            var width_shape_4 = $('#width_shape_4').val()
            var height_shape_4 = $('#height_shape_4').val()
            var height1_shape_4 = $('#height1_shape_4').val()
            if(width_shape_4 && height_shape_4 && height1_shape_4 && list_price){
                calculation = (( ( ( (parseInt(width_shape_4)+parseInt(height_shape_4)) / 2) * parseInt(height1_shape_4) ) /1000000)*parseInt(list_price))
                return calculation + bohrungen_price
            }
            else{
                return false
            }
        }
    }

    // For Width & Height Dynamic Cost
    $(document).on('change', '#width_shape_1,#height_shape_1', function(){
        price = priceCalculation(1)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    })

    $(document).on('change', '#width_shape_2,#height_shape_2', function(){
        price = priceCalculation(2)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    })

    $(document).on('change', '#width_shape_3,#height_shape_3', function(){
        price = priceCalculation(3)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    })

    $(document).on('change', '#width_shape_4,#height_shape_4,#height1_shape_4', function(){
        price = priceCalculation(4)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    })

    // For Thickness Dynamic Cost
    $(document).on('change', '.special_size', function(){
        console.log("==========special_size=======")
        price = priceCalculation(1)
        if(price){
            $('#list_price_span').html(price)
            $('#price_unit').val(price)
        }
    })

    /* SET ALL INPUT VALUES */
    $(document).on('change', '.width_input', function(){
        var width_input =  $(this).val()
        $('.width_input').val(width_input)
    })
    $(document).on('change', '.height_input', function(){
        var height_input =  $(this).val()
        $('.height_input').val(height_input)
    })
    $(document).on('change', '.height_input_1', function(){
        var height_input_1 =  $(this).val()
        $('.height_input_1').val(height_input_1)
    })
    $(document).on('change', '.width_input_1', function(){
        var width_input_1 =  $(this).val()
        $('.width_input_1').val(width_input_1)
    })
    $(document).on('change', '.width_input_2', function(){
        var width_input_2 =  $(this).val()
        $('.width_input_2').val(width_input_2)
    })
    /* END SET ALL INPUT VALUES */


    /* Start Shape Image As Tab */
    $(document).on('click', '.format_shape_1', function(){
        $('.f_shape_1').show();
        $('.f_shape_2').hide();
        $('.f_shape_3').hide();
        $('.f_shape_4').hide();
        $('.f_shape_5').hide();
        $('.f_shape_6').hide();
        $('.f_shape_7').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_1').addClass('active');
        $('#format').val('rectangle')
        price = priceCalculation(1)
        if(price){
            $('#list_price_span').html(price)
        }
    });

    $(document).on('click', '.format_shape_2', function(){
        $('.f_shape_2').show();
        $('.f_shape_1').hide();
        $('.f_shape_3').hide();
        $('.f_shape_4').hide();
        $('.f_shape_5').hide();
        $('.f_shape_6').hide();
        $('.f_shape_7').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_2').addClass('active');
        $('#format').val('ellipse')
        price = priceCalculation(2)
        if(price){
            $('#list_price_span').html(price)
        }
    });

    $(document).on('click', '.format_shape_3', function(){
        $('.f_shape_3').show();
        $('.f_shape_1').hide();
        $('.f_shape_2').hide();
        $('.f_shape_4').hide();
        $('.f_shape_5').hide();
        $('.f_shape_6').hide();
        $('.f_shape_7').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_3').addClass('active');
        $('#format').val('triangle')
        price = priceCalculation(3)
        if(price){
            $('#list_price_span').html(price)
        }
    });

    $(document).on('click', '.format_shape_4', function(){
        $('.f_shape_4').show();
        $('.f_shape_1').hide();
        $('.f_shape_2').hide();
        $('.f_shape_3').hide();
        $('.f_shape_5').hide();
        $('.f_shape_6').hide();
        $('.f_shape_7').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_4').addClass('active');
        $('#format').val('spec_rectangle')
        price = priceCalculation(4)
        if(price){
            $('#list_price_span').html(price)
        }
    });

    $(document).on('click', '.format_shape_5', function(){
        $('.f_shape_5').show();
        $('.f_shape_1').hide();
        $('.f_shape_2').hide();
        $('.f_shape_3').hide();
        $('.f_shape_4').hide();
        $('.f_shape_6').hide();
        $('.f_shape_7').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_5').addClass('active');
        $('#format').val('parallelogram')
    });

    $(document).on('click', '.format_shape_6', function(){
        $('.f_shape_6').show();
        $('.f_shape_1').hide();
        $('.f_shape_2').hide();
        $('.f_shape_3').hide();
        $('.f_shape_4').hide();
        $('.f_shape_5').hide();
        $('.f_shape_7').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_6').addClass('active');
        $('#format').val('trapezium')
    });

    $(document).on('click', '.format_shape_7', function(){
        $('.f_shape_7').show();
        $('.f_shape_1').hide();
        $('.f_shape_2').hide();
        $('.f_shape_3').hide();
        $('.f_shape_4').hide();
        $('.f_shape_5').hide();
        $('.f_shape_6').hide();
        $('.format_img').removeClass('active');
        $('.format_shape_7').addClass('active');
        $('#format').val('cropped_rectangle')
    });
    /* End Shape Image As Tab */

    /* Start ALl Side Input Show */
    $(document).on('click', '.right_side', function(){
        var right_side_val = $(this).val()
        if(right_side_val == '2'){
            $('.right_xy').removeClass('d-none')
        }else{
            $('.right_xy').addClass('d-none')
        }
    })

    $(document).on('click', '.top_side', function(){
        var top_side_val = $(this).val()
        if(top_side_val == '2'){
            $('.top_xy').removeClass('d-none')
        }else{
            $('.top_xy').addClass('d-none')
        }
    })

    $(document).on('click', '.left_side', function(){
        var left_side_val = $(this).val()
        if(left_side_val == '2'){
            $('.left_xy').removeClass('d-none')
        }else{
            $('.left_xy').addClass('d-none')
        }
    })

    $(document).on('click', '.bottom_side', function(){
        var bottom_side_val = $(this).val()
        if(bottom_side_val == '2'){
            $('.bottom_xy').removeClass('d-none')
        }else{
            $('.bottom_xy').addClass('d-none')
        }
    })
    /* End ALl Side Input Show */

     /* Cart Submit Function  */
    var has_submit_address_clicked = false;
    $("#cart_form").on('submit' ,function(e) {
        if (!has_submit_address_clicked){
            has_submit_address_clicked = true;
            e.preventDefault();
            var cart_description = 'Product Desciption here....'
            console.log("==================cart_description===================",cart_description)
            var values = {};
            var other_expenses_ids = [];

            $('#grant_other_expenses tbody tr').each(function(){
                var grant_other_expenses = {}
                grant_other_expenses['num_1'] = $(this).find('td input[name="num_1"]').val();
                grant_other_expenses['num_2'] = $(this).find('td input[name="num_2"]').val();
                grant_other_expenses['num_3'] = $(this).find('td input[name="num_3"]').val();
                other_expenses_ids.push(grant_other_expenses);
            });

            values['other_expenses_ids'] = other_expenses_ids;
            $('input[name="form_data"]').val(JSON.stringify(values));
            $('input[name="backend_details"]').val(JSON.stringify(cart_description));
            $(this).submit();
        }
    })

});