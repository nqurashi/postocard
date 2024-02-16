<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PackageUsesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'count' => $this->count,
            'details' => $this->details,
            'user' => new UserResource($this->whenLoaded('user')),
            'package_id' => $this->package_id,
        ];

    }
}
