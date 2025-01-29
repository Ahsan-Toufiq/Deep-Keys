// document.addEventListener('DOMContentLoaded', () => {
//     const actionMap = {
//         'Scroll Up One Message': 'scroll-UpOneMsg',
//         'Scroll Down One Message': 'scroll-DownOneMsg',
//         'Scroll to Top': 'scroll-Top',
//         'Scroll to Bottom': 'scroll-Bottom'
//     };

//     // Function to get the current shortcut configuration
//     function getShortcutConfig() {
//         const shortcuts = [];
//         const rows = document.querySelectorAll('.shortcut-row');

//         rows.forEach(row => {
//             const label = row.querySelector('.shortcut-label').textContent.trim();
//             const input = row.querySelector('.shortcut-input');

//             if (input) {
//                 const key = input.value.toUpperCase();
//                 shortcuts.push({
//                     key: key,
//                     altKey: true,
//                     action: actionMap[label] || label.toLowerCase().replace(/ /g, '-'),
//                     description: label
//                 });
//             }
//         });
//         return JSON.stringify(shortcuts, null, 4);
//     }

//     // Function to save shortcuts to chrome.storage.local
//     function saveShortcuts() {
//         const config = getShortcutConfig();
//         chrome.storage.local.set({ shortcuts: config }, function() {
//             console.log("Shortcuts saved to storage!");
//         });
//     }

//     // Function to retrieve saved shortcuts from chrome.storage.local
//     function loadShortcuts() {
//         // const a = document.getElementById('abccc');
//         // a.value = "Z";
//         chrome.storage.local.get('abc', function(result) {
//             const a = document.getElementById('abccc');
//             a.value = result.abc;
//         });
//         // chrome.storage.local.get(['shortcuts'], function(result) {
//         //     if (chrome.runtime.lastError) {
//         //         console.error('Error retrieving shortcuts:', chrome.runtime.lastError);
//         //         return;
//         //     }
//         //     const shortcuts = result.shortcuts;
//         //     // const a = document.getElementById('abccc');
//         //     // a.value = JSON.parse(shortcuts).key;
//         //     if (shortcuts) {
//         //         console.log("Retrieved shortcuts:", shortcuts);
//         //         populateShortcuts(JSON.parse(shortcuts));
//         //     } else {
//         //         console.log("No shortcuts found in storage.");
//         //     }
//         // });
//     }
//     // if (shortcuts) {
//     //     console.log("Retrieved shortcuts:", shortcuts);
//     //     populateShortcuts(JSON.parse(shortcuts));
//     // } else {
//     //     console.log("No shortcuts found in storage.");
//     // }
//     // // Function to populate the shortcut input fields with retrieved shortcuts
//     // function populateShortcuts(shortcuts) {
//     //     const rows = document.querySelectorAll('.shortcut-row');
//     //     rows.forEach(row => {
//     //         const label = row.querySelector('.shortcut-label').textContent.trim();
//     //         const input = row.querySelector('.shortcut-input');

//     //         const shortcut = shortcuts.find(sc => sc.description === label);
//     //         if (shortcut && input) {
//     //             input.value = shortcut.key;  // Set the value to the saved key
//     //         }
//     //     });
//     // }
// // saveShortcuts();
//     // Add event listeners to input fields
//     document.querySelectorAll('.shortcut-input').forEach(input => {
//         input.addEventListener('input', function() {
//             this.value = this.value.slice(-1).toUpperCase(); // Allow only one uppercase character
//             chrome.storage.local.set({ abc: this.value }, () => console.log('Stored abc: A'));
//             // saveShortcuts();
//             loadShortcuts();
//         });
//     });

//     // Load stored shortcuts when popup is opened
//     loadShortcuts();
// });
