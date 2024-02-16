<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PackageResource extends JsonResource
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
            'id'          => $this->id,
            'name' => $this->name,
            'package_code' => $this->package_code,
            'card_count' => $this->card_count,
            'package_detail'  => $this->package_detail,
            'discount'       => $this->discount,
            'price' => $this->price,
        ];
    }
}
