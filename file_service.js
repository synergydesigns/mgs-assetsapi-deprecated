const AWS = require('aws-sdk')
const async = require('async')
const path = require('path')
const fs = require('fs')
let pathParams, image, imagePath, bucketName;

/** Load Config File */
AWS.config.loadFromPath('config.json')

/** After config file load, create object for s3*/
const s3 = new AWS.S3({region: 'us-west-1'})

const createBucketName = (id) => {
    let name = id.toString();

    bucketName =  { Bucket: name };
}

const createImageName = (productName, productId) => {
    imagePath = path.join('images', process.env.NODE_ENV, `${productName}-${productId} `);
}

const createMainBucket = (callback) => {
	// Create the parameters for calling createBucket             
	s3.headBucket(bucketParams, function(err, data) {
	   if (err) {
	   	console.log("ErrorHeadBucket", err)
	      	s3.createBucket(bucketParams, function(err, data) {
			   if (err) {
			   	console.log("Error", err)
			      callback(err, null)
			   } else {
			      callback(null, data)
			   }
			});
	   } else {
	      callback(null, data)
	   }
	})                             
}
/**
 * 
 * @param {*} callback 
 * params variable contains- Bucket, Key, ACL, and Body.
 * Bucket — bucket name, where you would like to keep your file.
 * Key — file name (it will overwrite, if file name already exists. So please note that your file name should be unique to keep all records to S3).
 * ACL — defines accessibility permission to read the file. 'not necessary'
 * Body — file data.
 */

const createItemObject = (callback) => {
  const params = { 
        Bucket: bucketName, 
        Key: `${imagePath}`, 
        ACL: 'public-read',
        Body: image
    };
	s3.putObject(params, function (err, data) {
		if (err) {
	    	console.log("Error uploading image: ", err);
	    	callback(err, null)
	    } else {
	    	console.log("Successfully uploaded image on S3", data);
	    	callback(null, data)
	    }
	});
}

const getItemObject = () => {
    //TODO: Get a better way to do this
    const params = { 
        Bucket: bucketName, 
        Key: `${imagePath}`
    };
    s3.getObject(params, function(err, data) {

        if (err) return err;
        return data // manipulate data as needed

    });
};


exports.upload = (req, res, next) => {
	var tmp_path = req.files.file.path;
    // console.log("item", req.files.file)
	var tmp_path = req.files.file.path;
	image = fs.createReadStream(tmp_path);
    // imagePath = req.files.file.name;
    async.series([
        createMainBucket,
        createItemObject
        ], (err, result) => {
        if(err) return res.send(err)
        else return res.json({message: "Successfully uploaded"}) 
    })
};

exports.download = (req,res) => {
    return getItemObject();
}