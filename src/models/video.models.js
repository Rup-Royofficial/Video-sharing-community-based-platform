import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },{ timestamps: true})


videoSchema.plugin(mongooseAggregatePaginate)
/*
This setup allows you to use the pagination capabilities provided by mongoose-aggregate-paginate-v2 with the Video model.
*/

export const Video = mongoose.model("Video", videoSchema)

/*

Working idea of mongooseAggregatePaginate: 

Sure! Imagine you have a big book with 1000 pages. If you want to find something specific, 
it's easier if the book has a table of contents or an index that lets you jump to the right page.

In the same way, when you have a lot of videos stored in a database, you don't want to look through all of them at once. 
Pagination helps you look at a few videos at a time, like reading one page of a book at a time. 

With the `mongoose-aggregate-paginate-v2` plugin, you can:

- Flip Through Pages: See only a small number of videos at a time, like 10 videos per page.
- Go to Specific Pages: Jump directly to page 3 or 5 if you want to see videos on those pages.

This makes it much easier to manage and find videos in a large collection.

*/