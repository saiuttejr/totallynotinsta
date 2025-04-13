<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Comment extends Model
{
    protected $connection='mongodb';
    protected $table='comments';
    
    protected $fillable = [
        'comment',
        'user_id',
        'post_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(related: Post::class);
    }
    
}
