# AstrocyteMelanomaCoCulture
This directory stores the code for processing the images of astrocyte-melanoma co-culture. 
* Because ImageJ macro language is very similar to JavaScript, all the codes are in .js format during development in WebStorm

## Requirements for the input images
* All input files should be .ims
* After being imported, it should be a stack of 3 slices:
  1. Image taken at 405 nm excitation 
  2. Image taken at 488 nm excitation 
  3. Bright-field 

## Use
1. Donwload the .js file locally and rename the extension to .ijm
2. From ImageJ -> Plugins -> Macros -> Install to install this .ijm
3. Enjoy

## Code
The code was developed based on this paper: https://pubmed.ncbi.nlm.nih.gov/35094327/

Below are the sections about what the code is doing

### Better display and slice renaming
The raw .ims file is very black so this part of the code adjust the contrast automatically so the image is visible for the human eyes
* This doesn't change the raw data
* This excludes the bright-field image

Additionally, this part of the code also rename slices using 405, 488, and brightfield, so they're easier to refer later

### Background subtraction 
This section asks the user to make some selections on the background (can be done by the rectangle selection tool) in whatever number they like (3 selections are enough). Then an average intensity will be calculated from these selections and the average value will be used for subtraction from all the pixels
* This excludes the bright-file image

### Background set to NaN 
This section asks the user to set a threshold for the outline of the cells so the background can be set to NaN to avoid an error caused by division by zero in a later step
* This is only done on the 488 nm excitation image since it will be used as the denominator

### Generate ratio heatmap
This step generate and save the ratio heatmap from 405/488 images, save the heatmap and also an overlay of the heatmap on the bright-field

### Generate montage
This step generate and save a montage of 405, 488, bright-field, and ratio heatmap in a 2 by 2 grid

### Finish up
This step saves the stack used to make the montage in case you want to make changes to it later

Then this step closes all the windows generated from the initial input stack so the user is ready to process the next image