<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaymentHandling extends Controller
{
    public function MakePayment() {
        $provider = new PayPalClient;
        $provider = \PayPal::setProvider();
        $apitoken = $provider->getAccessToken();
        // return($apitoken);
        $data = json_decode('{
            "intent": "CAPTURE",
            "purchase_units": [
              {
                "amount": {
                  "currency_code": "USD",
                  "value": "100.00"
                }
              }
            ],
            "payment_source" : { "card":{"name": "ABC"}}
        }', true);

        // return($data);
        $order = $provider->createOrder($data);
        // $order_id = $order['id'];
        // $order = $provider->showOrderDetails($order_id);
        return($order);

    }



    public function CancelPayment() {
        return('cancelpayment');
    }


    public function SuccessPayment() {
        return('successpayment');
    }
}
