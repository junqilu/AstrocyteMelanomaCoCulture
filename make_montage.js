// Before using this code, ensure that you have used batch_set_intensity_range.ijm to make all the images on the same intensity range

function append_to_array(input_array, append_value) { //ImageJ script seems to lack a very basic append to an array function
    // input_array = Array.concat(input_array, append_value); //This doesn't work in some places since JavaScript passes arrays by reference and this line doesn't modify the input_array in place. When you reassign input_array, it creates a new local variable that doesn't affect the original array

    output_array = newArray();

    for (i = 0; i < input_array.length; i++) {
        output_array[i] = input_array[i]; // Copy existing elements to the new array
    }
    output_array[input_array.length] = append_value; // Add the new element to the end
    return output_array; // Return the new array

}

function locate_images_by_regex(regex_str, input_folder_directory){//This function return s an array of images that match the regex_str
    found_images_array = newArray();

    images = getFileList(input_folder_directory);
    for (i = 0; i < images.length; i++) { //Iterate through all opened images
        if (matches(images[i], regex_str)) {
            found_images_array = append_to_array(found_images_array, images[i]);
        } else {
            //Do nothing
        }
    }

    if (found_images_array.length > 0) {
        return found_images_array; //This should be a string for the image's name
    }else {
        print("No match imaged found!");
        return "No match imaged found!";
    }
}

// Function to create a montage for a given condition
function createMontage(condition, col_num, row_num, label_fontsize, inputFolder, outputFolder) {
    // Array to store the images in the montage
    images = newArray();

    images = locate_images_by_regex("^.*of "+condition+"_\\d{2}.\\d{2}.\\d{2}.tif$", inputFolder);

    for (i = 0; i < images.length; i++) {
        currentImage = images[i];
        open(inputFolder+"/"+currentImage);
    }

    run("Images to Stack", "use"); // Make all the images into a stack

    run("Make Montage...", "columns="+col_num+" rows="+row_num+" scale=1 font="+label_fontsize+" label"); // Make the montage


    // Save the montage as a new PNG image
    pngFileName = "Montage_" + condition + ".png";
    saveAs("PNG", outputFolder + pngFileName);

    // Save the montage as a new TIFF image
    tifFileName = "Montage_" + condition + ".tif";
    saveAs("TIFF", outputFolder + tifFileName);

    close(); //Close the montage
    close("stack"); //Close the image stack
}


function getUserInput(prompt, defaultValue) {
    // Prompt the user for input
    userInput = getNumber(prompt, defaultValue);

    // Return the user's input
    return userInput;
}


// Define input and output folders
inputFolder = getDirectory("Choose a Folder with TIF images");
outputFolder = getDirectory("Choose or Create an Output Folder");

col_num = getUserInput("Input the number of images per col", 5);
row_num = getUserInput("Input the number of images per row", 3);
label_fontsize = 20;

// List of conditions
conditions = newArray("GEVALNull_EtOH", "GEVALNull_AVN", "GEVALNull_MPA", "GEVAL30_EtOH", "GEVAL30_AVN", "GEVAL30_MPA");


// Iterate over the conditions using index
for (index = 0; index < lengthOf(conditions); index++) {
    condition = conditions[index];
    createMontage(condition, col_num, row_num, label_fontsize, inputFolder, outputFolder);
}





