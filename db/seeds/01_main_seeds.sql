INSERT INTO users (username, password, email, biography, icon)
VALUES ('Bob', '12345', 'bob@gmail.com', 'I am a med student at the McGill University', 'https://image.flaticon.com/icons/svg/145/145846.svg');
INSERT INTO users (username, password, email, biography, icon)
VALUES ('maria_ferdinand', '12345', 'mariaferdinand@gmail.com', 'I am a software developer for Google', 'https://image.flaticon.com/icons/svg/145/145844.svg');
INSERT INTO users (username, password, email, biography, icon)
VALUES ('robert123', '12345', 'robertalcalaz@gmail.com', 'I am a passionate photographer', 'https://image.flaticon.com/icons/svg/145/145843.svg');
INSERT INTO users (username, password, email, biography, icon)
VALUES ('Beatrix', '12345', 'beatrix.dj@gmail.com', 'I am a DJ on the side', 'https://image.flaticon.com/icons/svg/145/145847.svg');
INSERT INTO users (username, password, email, biography, icon)
VALUES ('Francis Bourgouin', '12345', 'francisBourgouin@gmail.com', 'I am LIT', 'https://image.flaticon.com/icons/svg/145/145848.svg');
INSERT INTO users (username, password, email, biography, icon)
VALUES ('Labber', '12345', 'labberlabber@gmail.com', 'I am a student at Lighthouse Labs', 'https://image.flaticon.com/icons/svg/273/273581.svg');

INSERT INTO collections (owner_id, title, description)
VALUES (1, 'Biology Sem_2', 'resources and tutorials for biology classes from semester two');
INSERT INTO collections (owner_id, title, description)
VALUES (1, 'Chemistry Sem_1', 'resources and tutorials for chemistry classes from semester one');
INSERT INTO collections (owner_id, title, description)
VALUES (1, 'Surgery Sem_2', 'resources and tutorials for surgery practice');
INSERT INTO collections (owner_id, title, description)
VALUES (2, 'JS tutorials', 'My coding tutorials in  javascript');
INSERT INTO collections (owner_id, title, description)
VALUES (3, 'The art of photography', 'Photos, tutorials and my perspective regarding photography');
INSERT INTO collections (owner_id, title, description)
VALUES (3, 'Starter pack', 'Tutorials and advices to start in the photography world');
INSERT INTO collections (owner_id, title, description)
VALUES (3, 'Trip to the United State', 'photos from my trip to the united states');
INSERT INTO collections (owner_id, title, description)
VALUES (3, 'For Instagram', 'shots to post on instagram');
INSERT INTO collections (owner_id, title, description)
VALUES (3, 'Landscapes', 'My best landscape shots from all around the world');
INSERT INTO collections (owner_id, title, description)
VALUES (4, 'How To become a DJ', 'Tutorials and blogs to teach you how to become a DJ');
INSERT INTO collections (owner_id, title, description)
VALUES (5, 'LIT', 'We getting LIT in Stockholm');

INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (1, 1, 'Saving lives with medical CPR', 'http://blogs.biomedcentral.com/on-medicine/2019/09/16/world-heart-day-saving-lives-with-cpr/',
'Cardiopulmonary resuscitation (CPR) is a life-saving medical procedure given to patients in cardiac arrest. It involves pressing down rhythmically on the chest (compressions) to help pump blood around the body and giving a series of rescue breaths.');
INSERT INTO posts (user_id, collection_id, title, url)
VALUES (1, 1, 'Overview of the medical functions of the cerebral cortex', 'https://www.youtube.com/watch?v=X-m0JDCw6TE');
INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (1, 1, 'Liver Cancer and medical treatment', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CT_cholangioca.jpg/600px-CT_cholangioca.jpg',
'Liver cancer, also known as hepatic cancer and primary hepatic cancer, is cancer that starts in the liver.[1] Cancer which has spread from elsewhere to the liver,
known as liver metastasis, is more common than that which starts in the liver.[3] Symptoms of liver cancer may include a lump or pain in the right side below the rib cage,
swelling of the abdomen, yellowish skin, easy bruising, weight loss and weakness.[1]');
INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (1, 1, 'medical review: Kidneys and Renal System', 'https://magoosh.com/mcat/mcat-review-topic-kidneys-and-renal-system/',
'The renal system, also known as the urinary system, consists of the kidneys, ureters, bladder, and the urethra.
Its purposes are to eliminate wastes from the body, regulate blood volume and blood pressure, control levels of electrolytes and metabolites,
and regulate blood pH.');

INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (3, 5, 'photography tutorial', 'https://www.youtube.com/watch?v=5b6gVjLWJSA',
'Tips and tricks to help you make your photos more vibrant');
INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (3, 5, 'Yosemite landscape photography', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
'Photo from my trip to the United State and the Yosemite valley early in the morning');
INSERT INTO posts (user_id, collection_id, title, url)
VALUES (3, 5, 'landscape photography: Pragser Wildsee, Italy', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (3, 5, 'How to make good instagrams photos', 'https://blog.hootsuite.com/how-to-take-good-instagram-photos/',
'Learning how to take good photos on your phone requires understanding some basic principles of composition and lighting, and honing your own instincts as a photographer.
You just need to follow a few simple rules. Lighting is the foundation of a good photo. Understanding how to use light is the first and most important rule of getting great photos using only your phone.
Avoid using your flash in favor of natural light, which creates photos that are richer and brighter.
A flash can flatten out your photo and wash out your subject. If you can’t shoot outdoors,  take photos near windows or in well-lit rooms. Even at night, it’s preferable to find sources of ambient light, like street lamps and store windows.');
INSERT INTO posts (user_id, collection_id, title, url)
VALUES (3, 5, 'How to Give Your Photos the Cyberpunk Look in Photoshop', 'https://www.youtube.com/watch?v=Kq93yph7wek');
INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (3, 5, 'photos from the desert', 'https://images.unsplash.com/photo-1544882466-01f34974bf25?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
'Photos from my trip in Morocco');

INSERT INTO posts (user_id, collection_id, title, url, description)
VALUES (5, 11, 'little chiken is LIT', 'https://www.youtube.com/watch?v=VMENQ2tbQSw',
'Just a video of chicken little');


INSERT INTO likes (user_id, post_id) VALUES (1, 5);
INSERT INTO likes (user_id, post_id) VALUES (2, 5);
INSERT INTO likes (user_id, post_id) VALUES (4, 5);
INSERT INTO likes (user_id, post_id) VALUES (5, 5);
INSERT INTO likes (user_id, post_id) VALUES (2, 6);
INSERT INTO likes (user_id, post_id) VALUES (4, 6);
INSERT INTO likes (user_id, post_id) VALUES (5, 6);
INSERT INTO likes (user_id, post_id) VALUES (1, 11);
INSERT INTO likes (user_id, post_id) VALUES (2, 11);
INSERT INTO likes (user_id, post_id) VALUES (4, 11);

INSERT INTO comments (user_id, post_id, content)
VALUES (1, 5, 'Thank you so much! this tutorial was really helpful.');
INSERT INTO comments (user_id, post_id, content)
VALUES (4, 5, 'I learnt something new today');
INSERT INTO comments (user_id, post_id, content)
VALUES (5, 5, 'This is weird.');

INSERT INTO comments (user_id, post_id, content)
VALUES (2, 6, 'What a beautiful photo.');
INSERT INTO comments (user_id, post_id, content)
VALUES (1, 6, 'I need to go there next summer!');

INSERT INTO ratings (user_id, post_id, value) VALUES (1, 5, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (4, 5, 4);
INSERT INTO ratings (user_id, post_id, value) VALUES (5, 5, 2);
INSERT INTO ratings (user_id, post_id, value) VALUES (2, 5, 4);
INSERT INTO ratings (user_id, post_id, value) VALUES (1, 6, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (2, 6, 4);
INSERT INTO ratings (user_id, post_id, value) VALUES (5, 6, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (4, 6, 4);
INSERT INTO ratings (user_id, post_id, value) VALUES (1, 11, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (2, 11, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (3, 11, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (5, 11, 5);
INSERT INTO ratings (user_id, post_id, value) VALUES (4, 11, 5);

INSERT INTO followed_collections (user_id, collection_id) VALUES (3, 4);
INSERT INTO followed_collections (user_id, collection_id) VALUES (3, 10);
INSERT INTO followed_collections (user_id, collection_id) VALUES (3, 11);


