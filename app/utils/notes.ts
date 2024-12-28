// This file is to serve as a hardcoded example output as to not use api credits

export const exampleNotes = `# Directory Implementations Notes

## Overview of FAT File System
- **FAT File System (File Allocation Table)**
  - Designed and implemented by Marc McDonald.
  - Uses an **index table** (the FAT) stored on the device to identify chains of data storage areas associated with a file.
  - **Static Allocation**: FAT is statically allocated at the time of formatting.
  - Evolved through various versions: 
    - 8 bits
    - 12 bits
    - 16 bits
    - 32 bits

## FAT32 Directories Structure
- **Directory Entry Fields**:
  - Base name: 8 bytes
  - Extension: 3 bytes
  - N/A (reserved): 1 byte
  - Creation date/time: 1 byte
  - Last write date/time: 1 byte
  - File size: 4 bytes
  - Attributes: 2 bytes
  - Last access date: 2 bytes
  - Upper 12 bits of starting block: 2 bytes
  - Lower 16 bits of starting block: 4 bytes

### Long File Names
- **Virtual FAT (VFAT)** Directories:
  - Implemented as an optional extension on top of the existing FAT file system.
  - Files have long file name entries before the base entry in the directory.
- **Entry Structure for Long File Names**:
  - Each entry consists of:
    - 5 characters: 10 bytes
    - Sequence number: 1 byte
    - UNICODE characters encoded in 16 bits
    - Additional metadata (timestamps, file attributes)
  
## UNIX Directories
- **Version 7 UNIX Directory Entry**:
  - File name: 14 bytes (max)
  - I-node number: 2 bytes
  
- **Ext4 Linear Directory Entry**:
  - File name: up to 255 bytes (max; fixed length, variable by filesystem)
  - Record length: 2 bytes
  - Name length: 1 byte
  - I-node number: 4 bytes
  - Type: 1 byte
  
- **Constraints**: V7 file names can contain any ASCII characters except “/” (path separator) and NUL (used for padding).

## ISO 9660 File System
- **Directory Entry Structure**:
  - Location of file: 8 bytes
  - Directory entry length: 1 byte
  - Extended attribute record length: 2 bytes
  - Interleave: 4 bytes
  - File size: 8 bytes
  - Date and time: 7 bytes
  - Flags: 1 byte
  - File name: 4-15 bytes

### Extensions in ISO 9660
- **Joliet Extensions**:
  - Support for long file names.
  - Utilizes Unicode character set.
  - Allows deeper directory nesting (more than 8 levels).
  - Directory names with extensions.
  
- **Rock Ridge Extensions**:
  - PX: POSIX attributes.
  - PN: Device numbers.
  - SL: Symbolic link.
  - NM: Alternative name.
  - CL: Child location.
  - PL: Parent location.
  - RE: Relocation.
  - TF: Time stamps.

## References
- Tanenbaum, A. S. & Bos, H. (2015). *Modern Operating Systems* (4th ed.). Pearson.

### Closing
Thank you for reviewing these notes on directory implementations!`;