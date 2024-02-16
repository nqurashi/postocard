<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

trait ResponseMethodTrait
{
    protected function sendError($errorMessages, $result = [], $code = 404): JsonResponse
    {
        $response = [
            'metadata' => [
                'responseCode' => $code,
                'success' => false,
                'message' => $errorMessages,
            ],
            'payload' => $result,
        ];

        return response()->json($response, $code);
    }

    protected function sendResponse($result, string $message = '', $code = 200): JsonResponse
    {
        $response = [
            'metadata' => [
                'responseCode' => $code,
                'success' => true,
                'message' => __($message),
            ],
            'payload' => $result,
        ];

        return response()->json($response, 200);
    }

    protected function sendServerError(string $errorMessages = 'Something went wrong, internal server error', $result = [], $code = 500): JsonResponse
    {
        $response = [
            'metadata' => [
                'responseCode' => $code,
                'success' => false,
                'message' => __($errorMessages),
            ],
            'payload' => $result,
        ];

        return response()->json($response, $code);
    }

    protected function serverErrorMessage(): string
    {
        return __('Something went wrong, internal server error');
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException($this->sendError($validator->errors(), [], 422));
    }
}
