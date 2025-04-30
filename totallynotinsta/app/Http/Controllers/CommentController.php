<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request, Post $post)
    {
        $data = $request->validate([
            'comment' => 'required|max:255',
        ]);

        $post->comments()->create([
            'comment' => $data['comment'],
            'user_id' => auth()->id(),
        ]);

        return redirect('/posts/' . $post->id);
    }

    public function destroy(Comment $comment)
    {
        // Check if the authenticated user is the comment owner or post owner
        if (auth()->id() !== $comment->user_id && auth()->id() !== $comment->post->user_id) {
            abort(403, 'Unauthorized action.');
        }
        
        $postId = $comment->post_id;
        $comment->delete();

        return redirect('/posts/' . $postId);
    }
}