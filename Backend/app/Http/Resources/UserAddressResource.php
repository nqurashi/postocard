<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'full_name' => $this->full_name,
            'country' => $this->country,
            'address_name' => $this->address_name,
            'street_address' => $this->street_address,
            'city' => $this->city,
            'town' => $this->town,
            'state' => $this->state,
            'postal_code' => $this->postal_code,
            'phone' => $this->phone,
        ];
    }
}
