INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Growth Model vs. Basic Needs Approach',
    'Shortly after World War II, ‘development’ as we now understand it was set in motion. Western governments and donors poured money into new agencies that set about trying to stimulate the economies of underdeveloped countries. Because of this emphasis, it is now widely regarded as the Growth Model. Although we might expect poverty reduction to be the central objective, planners at this stage were primarily concerned with industrial development. It was hoped that the benefits of this would trickle down to poor people through raising incomes and providing employment opportunities, thereby indirectly lifting them above the ascribed poverty threshold of a dollar a day. The weaknesses of these assumptions were revealed, however, when poverty rates and economic growth were found to rise simultaneously in many countries.\n\nDuring the 1970s, a new trend took over – trickle-up development. Instead of focusing on macroeconomic policy and large-scale industrial projects, planners shifted attention to the core living requirements of individuals and communities. This became known as the Basic Needs Approach to development. It was hoped that through the provision of services such as community sanitation and literacy programmes, poverty could be eliminated from below. Economic growth was desirable but superfluous – Basic Needs redefined poverty from involving a lack of money to lacking the capability to attain full human potential. The trouble with Basic Needs programmes, however; was their expensive, resource-intensive nature that entailed continuous management and funding.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "[1] was the main goal.",
                "correct_answer": "Industrial development"
            },
            {
                "id": "2",
                "question": "Typified by small-scale aid such as [2] and [3].",
                "correct_answer": "Poverty reduction"
            },
            {
                "id": "3",
                "question": "Typified by small-scale aid such as health and [3].",
                "correct_answer": "Literacy"
            },
            {
                "id": "4",
                "question": "Poverty is seen as an inability to reach [4].",
                "correct_answer": "Human potential"
            }
        ],
        "table_structure": {
            "headers": ["Growth Model", "Basic Needs Approach"],
            "rows": [
                ["[1] was the main goal.", "Typified by small-scale aid such as [2] and [3]."],
                ["Poverty described as living on less than a dollar a day.", "Poverty is seen as an inability to reach [4]."]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Tacoma Narrows Bridge – Disaster Strikes',
    'When the Tacoma Narrows Bridge opened for traffic on 1 July 1940, it was celebrated as a major engineering achievement. Even before construction was completed, however, flaws in the design were apparent; workers sucked on lemon slices to avoid motion sickness as the structure swayed in the relatively mild winds. Engineers tried three different revisions during construction to address the vibration problem. Shortly after opening, the bridge quickly acquired the fond nickname of “Galloping Gertie” because of the way it would roll in either side-to-side or lengthways movements – known in physics terms as the longitudinal and transverse modes of vibration respectively. These movements did not compromise the core integrity of the structure but did make the crossing of a somewhat white-knuckle affair.\n\nFour months later, however, a never-before-seen type of vibration began afflicting the bridge in what were still fairly gentle winds (about 40kmph). Rather than the simple “wave” motion that characterizes longitudinal and transverse vibration, the left side of the bridge would rise while the right side fell, but the centre line of the road would remain completely level. This was proved when two men walked along the centre of the bridge completely unaffected by the rocking motions around them. Visually, the bridge’s movements seemed to be more like a butterfly flapping its wings than a simple rolling motion. Engineers now understand this to be the torsional mode of vibration, and it is extremely hard to detect.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Moving repeatedly to the left and right.",
                "correct_answer": "Longitudinal"
            },
            {
                "id": "2",
                "question": "Up and down motion; like a wave.",
                "correct_answer": "Transverse"
            },
            {
                "id": "3",
                "question": "Resembling motions of a butterfly.",
                "correct_answer": "Butterfly"
            }
        ],
        "table_structure": {
            "headers": ["Mode of Vibration", "Description"],
            "rows": [
                ["[1]", "Moving repeatedly to the left and right"],
                ["[2]", "Up and down motion; like a wave"],
                ["Torsional", "Resembling motions of a [3]"]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Disorders: An Overview',
    'Children with Autistic Spectrum Disorder have difficulty understanding what other people are saying, need help to play with other children, enjoy routines and find unfamiliar situations difficult. People with Autistic Spectrum Disorder can be good at creative activities like art, music, and poetry. They can concentrate on one thing for a long time no they can become very good at something that they like doing.\n\nPeople with ADHD have three types of problems. Overactive behaviour (hyperactivity), impulsive behaviour and difficulty pitying attention. Children with ADHD are not just very active but have a wide range of problem behaviours which can make them very difficult to care for and control. Those who have ADHD often find it difficult to fit in at school. They may also have problems getting on with other children. Some children have significant problems with concentration and attention but are not necessarily overactive or impulsive. These children are sometimes described as having Attention Deficit Disorder (ADD) rather than ADHD. ADD can easily be missed because the child is quiet and dreamy rather than disruptive. ADHD is not related to intelligence. Children with all levels of ability can have ADHD.\n\nSchizophrenia is a diagnosis given to some people who have severely disrupted beliefs and experiences. During an episode of schizophrenia, a person’s experience and interpretation of the outside world is disrupted – they may lose touch with reality, see or hear things that are not there and act in unusual ways in response to these ‘hallucinations’. An episode of schizophrenia can last for several weeks and can be very frightening. The causes are unknown but episodes of schizophrenia appear to be associated with changes in some brain chemicals. Stressful experiences and some recreational drugs are sometimes thought to trigger an episode.\n\nDepression describes a range of moods, from the low spirits that we all experience, to a severe problem that interferes with everyday life. The latter type, sometimes referred to as “clinical depression”, is defined as its “a persistent exaggeration of the everyday feelings that accompany sadness”. If you have severe depression you may experience low mood, loss of interest and pleasure as well as feelings of worthlessness and guilt. You may also experience tearfulness, poor concentration, reduced energy, reduced or increased appetite, changes in weight, sleep problems and anxiety. You may even feel that life is not worth living and plan or attempt suicide.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "May excel in activities of a [1] nature.",
                "correct_answer": "Creative"
            },
            {
                "id": "2",
                "question": "May appear [2].",
                "correct_answer": "Quiet and dreamy"
            },
            {
                "id": "3",
                "question": "May respond to experiencing episodes of the disease by behaving in very [3].",
                "correct_answer": "Unusual ways"
            },
            {
                "id": "4",
                "question": "May experience feelings of futility that lead to thoughts of [4].",
                "correct_answer": "Suicide"
            }
        ],
        "table_structure": {
            "headers": ["Disorder", "Personality Trait Exhibited by Sufferer"],
            "rows": [
                ["Autism Spectrum Disorder", "May excel in activities of a [1] nature."],
                ["Attention Deficit Disorder", "May appear [2]."],
                ["Schizophrenia", "May respond to experiencing episodes of the disease by behaving in very [3]."],
                ["Depression", "May experience feelings of futility that lead to thoughts of [4]."]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Nature’s Most Violent Wind',
    'Tornados are classified into three levels of intensity; these being weak, strong and violent. 88% of tornados occurring in the USA are classified into the first category making them the most common; they account for less than 5% of fatalities resulting from tornado activity, generally reach wind speeds of less than 177kms/hour and have a duration of between 1 and 10 minutes before cessation. In contrast, ‘violent’ tornados exceed 330 kilometres per hour, can continue for over an hour and while they account for only 1% of the incidence of tornados they result in approximately 70% of resultant deaths. The greatest devastation to date inflicted on the USA by a violent tornado was on March 18th, 1925.\n\nThe tornado was the longest, fastest and widest tornado known to have formed in North America and resulted in 695 deaths, an additional 2279 being injured. Now known as the Tri-state Tornado, it travelled over 350 kilometres affecting 13 counties in the three different states of Missouri, Illinois and Indiana. Around 11% of tornados are classified as ‘strong’ tornados. These tornados account for slightly more than 25% of tornado-related fatal accidents and reach mid-range speeds of between 177 and 330 kilometres per hour with an average duration of around 20 minutes.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Make up [1] of tornados in the USA.",
                "correct_answer": "88%"
            },
            {
                "id": "2",
                "question": "Make up about [2] of tornados in the USA.",
                "correct_answer": "11%"
            },
            {
                "id": "3",
                "question": "Can last for [3].",
                "correct_answer": "Over an hour"
            },
            {
                "id": "4",
                "question": "Cause just over [4] of tornado related deaths.",
                "correct_answer": "25%"
            },
            {
                "id": "5",
                "question": "The most violent example in the USA was the [5].",
                "correct_answer": "Tri-state tornado"
            }
        ],
        "table_structure": {
            "headers": ["Classification", "Incidence", "Wind speed", "Lifespan", "Impact"],
            "rows": [
                ["Weak", "Make up [1] of tornados in the USA.", "Less than 177kms/hr", "1-10 minutes", "Cause less than 5% of tornado related deaths"],
                ["Strong", "Make up about [2] of tornados in the USA.", "Between 177 and 330 kms/hr", "20 minutes", "Cause just over [4] of tornado related deaths"],
                ["Violent", "Make up the smallest minority of tornados in the USA", "More than 330 kms/hr", "Can last for [3]", "The most violent example in the USA was the [5]"]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'The Birth of Scientific English',
    'Across Europe similar academies and societies arose, creating new national traditions of science. In the initial stages of the scientific revolution, most publications in the national languages were popular works, encyclopaedias, educational textbooks and translations. Original science was not done in English until the second half of the 17th century. For example, Newton published his mathematical treatise, known as the Principia, in Latin, but published his later work on the properties of light – Opticks – in English. There were several reasons why original science continued to be written in Latin. The first was simply a matter of audience. Latin was suitable for an international audience of scholars, whereas English reached a socially wider, but more local audience. Hence, popular science was written in English. A second reason for writing in Latin’ may, perversely, have been a concern for secrecy.\n\nOpen publication had dangers in putting into the public domain preliminary ideas which had not yet been fully exploited by their ‘author’. This growing concern about intellectual property rights was a feature of the period – it reflected both the humanist notion of the individual, rational scientist who invents and discovers through private intellectual labour, and the growing connection between original science and commercial exploitation. There was something of a social distinction between ‘scholars and gentlemen’ who understood Latin, and men of trade who lacked a classical education. And in the mid-17fh century it was common practice for mathematicians to keep their discoveries and proofs secret, by writing them in cipher, in obscure languages, or in private messages deposited in a sealed box with the Royal Society. Some scientists might have felt more comfortable with Latin precisely because its audience, though international, was socially restricted.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Popular science written in [1].",
                "correct_answer": "English"
            },
            {
                "id": "2",
                "question": "Original science in the first half of the 17th century was written in [2].",
                "correct_answer": "Latin"
            },
            {
                "id": "3",
                "question": "[3] audience, but socially wider.",
                "correct_answer": "Local"
            },
            {
                "id": "4",
                "question": "Socially [4].",
                "correct_answer": "Restricted"
            }
        ],
        "table_structure": {
            "headers": ["Language", "Type of Science", "Target Audience"],
            "rows": [
                ["Latin", "Original", "Socially [4]"],
                ["English", "[1]", "[3] audience, but socially wider"]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Sculpture',
    'In Africa, perhaps more than any other region in the world, three-dimensional artwork is favoured and given more emphasis than two-dimensional paintings. Whilst some experts hold that the art of sculpture in the continent dates back to the Nok civilization of Nigeria in 500 BC, this is disputed due to evidence of the art’s existence in Pharaonic Africa. To the expert eye, African art is clearly defined by the region from which it is from and easily identifiable from the differences in a technique used and material from which it is made. Figurines from the West African region are sculpted in two distinctly different forms. The first is characterized by angular forms and features with elongated bodies, such sculptures being traditionally used in religious rituals. Conversely, the traditional wood statues of the Mande speaking culture possess cylindrical arms and legs with broad, flat surfaces. Metal sculptures that hail from the eastern regions of West Africa are heralded by many as amongst the most superior art forms ever crafted.\n\nCentral African sculpture may be a little more difficult to identify for the novice observer as a wider variety of materials may be used, ranging from wood to ivory, stone or metal. However, despite tills, the distinct style of usage of smooth lines and circular forms still helps to define the origin of such works. In both Eastern and Southern Africa, typically, art depicts a mixture of human and animal features. Art from the former region Is usually created in the form of a pole carved in human shape and topped with a human or animal image which has a strong connection with the death, burial, and the spiritual world. Such creations are less recognized as art in the traditional sense than those from other parts of Africa. In Southern Africa, the human/animal hybrid representations are fashioned from clay, the oldest known examples dating back to from between 400 and 600 A.D.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Subjects similar to the [1] area of the country.",
                "correct_answer": "Southern"
            },
            {
                "id": "2",
                "question": "Made from [2].",
                "correct_answer": "Clay"
            },
            {
                "id": "3",
                "question": "Conventionally made for the purpose of [3].",
                "correct_answer": "Religious rituals"
            },
            {
                "id": "4",
                "question": "Crafted from [4].",
                "correct_answer": "Wood"
            },
            {
                "id": "5",
                "question": "More difficult to recognize due to the diversity of [5] used.",
                "correct_answer": "Materials"
            }
        ],
        "table_structure": {
            "headers": ["Region", "Style", "Additional Information"],
            "rows": [
                ["Eastern Africa", "[1]", "Subjects similar to the [1] area of the country."],
                ["Southern Africa", "Artwork representing human & animal form", "Made from [2]"],
                ["Western Africa", "Style 1: Sharp lines, long bodies", "Conventionally made for the purpose of [3]"],
                ["Western Africa", "Style 2: Cylindrical, broad and flat lines crafted from [4]", "Made by Mande speakers"],
                ["Central Africa", "Smooth lines & circular forms", "More difficult to recognize due to the diversity of [5] used"]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'How Baby Talk Gives Infant Brains A Boost',
    'Fathers don’t use baby talk as often or in the same ways as mothers – and that’s perfectly OK, according to a new study. Mark Van Dam of Washington State University at Spokane and colleagues equipped parents with recording devices and speech-recognition software to study the way they interacted with their youngsters during a normal day. ‘We found that moms do exactly what you’d expect and what’s been described many times over,’ VanDam explains. ‘But we found that dads aren’t doing the same thing. Dads didn’t raise their pitch or fundamental frequency when they talked to kids.’ The idea is that a kid gets to practice a certain kind of speech with mom and another kind of speech with dad, so the kid then has a wider repertoire of kinds of speech to practice,’ says VanDam. Scientists from the University of Washington and the University of Connecticut collected thousands of 30-second conversations between parents and their babies, fitting 26 children with audio-recording vests that captured language and sound during a typical eight-hour day. The study found that the more baby talk parents used, the more their youngsters began to babble. And when researchers saw the same babies at age two, they found that frequent baby talk had dramatically boosted vocabulary, regardless of socioeconomic status. Those children who listened to a lot of baby talk were talking more than the babies that listened to more adult talk or standard speech,’ says Nairan Ramirez-Esparza of the University of Connecticut. ‘We also found that it really matters whether you use baby talk in a one-on-one context,’ she adds. The more parents use baby talk one-on-one, the more babies babble, and the more they babble, the more words they produce later in life.’',
    '{
        "questions": [
            {
                "id": "1",
                "question": "The importance of adults giving babies individual attention when talking to them.",
                "correct_answer": "Nairán Ramirez-Esparza"
            },
            {
                "id": "2",
                "question": "The connection between what babies hear and their own efforts to create speech.",
                "correct_answer": "Patricia Kuhl"
            },
            {
                "id": "3",
                "question": "The advantage for the baby of having two parents each speaking in a different way.",
                "correct_answer": "Mark VanDam"
            },
            {
                "id": "4",
                "question": "The connection between the amount of baby talk babies hear and how much vocalizing they do themselves.",
                "correct_answer": "Nairán Ramirez-Esparza"
            }
        ],
        "table_structure": {
            "headers": ["Researcher", "Observation"],
            "rows": [
                ["[1]", "The importance of adults giving babies individual attention when talking to them."],
                ["[2]", "The connection between what babies hear and their own efforts to create speech."],
                ["[3]", "The advantage for the baby of having two parents each speaking in a different way."],
                ["[4]", "The connection between the amount of baby talk babies hear and how much vocalizing they do themselves."]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Twist In The Tale',
    'Less than three years ago, doom merchants were predicting that the growth in video games and the rise of the Internet would sound the death knell for children’s literature. But contrary to popular myth, children are reading more books than ever. A recent survey by Books Marketing found that children up to the age of 11 read on average for four hours a week, particularly girls. Moreover, the children’s book market, which traditionally was seen as a poor cousin to the more lucrative and successful adult market, has come into its own. ‘Children’s books are going through an incredibly fertile period,’ says Wendy Cooling, a children’s literature consultant. ‘There’s a real buzz around them. Book clubs are happening, sales are good, and people are much more willing to listen to children’s authors.’ The main growth area has been the market for eight to fourteen-year-olds, and there is little doubt that the boom has been fuelled by the bespectacled apprentice, Harry Potter. ‘Harry made it OK to be seen on a bus reading a book,’ says Cooling. ‘People still tell me, “Children don’t read nowadays”,’ says David Almond, the award-winning author of children’s books such as Skellig. The truth is that they are skilled, creative readers. When I do classroom visits, they ask me very sophisticated questions about use of language, story structure, chapters and dialogue.’',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Children take pleasure in giving books to each other.",
                "correct_answer": "D"
            },
            {
                "id": "2",
                "question": "Reading in public is an activity that children have not always felt comfortable about doing.",
                "correct_answer": "A"
            },
            {
                "id": "3",
                "question": "Some well-known writers of adult literature regret that they earn less than popular children’s writers.",
                "correct_answer": "B"
            },
            {
                "id": "4",
                "question": "Children are quick to decide whether they like or dislike a book.",
                "correct_answer": "C"
            },
            {
                "id": "5",
                "question": "Children will read many books by an author that they like.",
                "correct_answer": "D"
            }
        ],
        "table_structure": {
            "headers": ["Person", "Observation"],
            "rows": [
                ["Wendy Cooling", "[1] Children take pleasure in giving books to each other."],
                ["David Almond", "[2] Reading in public is an activity that children have not always felt comfortable about doing."],
                ["Julia Eccleshare", "[3] Some well-known writers of adult literature regret that they earn less than popular children’s writers."],
                ["Jacqueline Wilson", "[4] Children are quick to decide whether they like or dislike a book."],
                ["Anne Fine", "[5] Children will read many books by an author that they like."]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'The Romantic Poets',
    'The lives of the poets often overlapped and tragedy was typical in most of them. Byron was born in London in 1788. The family moved to Aberdeen soon after, where Byron was brought up until he inherited the family seat of Newstead Abbey in Nottinghamshire from his great uncle. He graduated from Cambridge University in 1808 and left England the following year to embark on a tour of the Mediterranean. He left for Switzerland in 1816 where he was introduced to Shelley. Shelley was born to a wealthy family in 1792. He was educated at Eton and then went on to Oxford. Shelley was not happy in England, where his colourful lifestyle and unorthodox beliefs made him unpopular with the establishment. In 1818 he left for Italy, where he was reunited with Byron. However, the friendship was tragically brought to an end in July 1822, when Shelley was drowned in a boating accident off the Italian coast.\n\nBy contrast, Wordsworth appears to have been of a pleasant and acceptable personality, even receiving the status of Poet Laureate in 1843. He was born in 1770 in Cockermouth, Cumbria. By the time he entered his early teens, both his parents had died. As he grew older, Wordsworth developed a passion for writing. In 1798 Wordsworth published a collection of poems with Coleridge, whom he had met, a few years earlier, when he settled in Somerset with his sister Dorothy. He married in 1802 and, as time passed, he deserted his former political views and became increasingly acceptable to popular society. Coleridge was born in Devon in 1772. He was a bright young scholar but never achieved the same prolific output of his fellow Romantic poets. In 1804 he left for a position in Malta for three years. On his return, he separated from his wife and went to live with the Wordsworths, where he produced a regular periodical. With failing health, he later moved to London. In 1816 he went to stay with a doctor and his family. He remained with them until his death in 1834.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Went on a journey around; came to love [1].",
                "correct_answer": "Mediterranean"
            },
            {
                "id": "2",
                "question": "Became more accepted when he changed his [2].",
                "correct_answer": "Political views"
            },
            {
                "id": "3",
                "question": "His [3] was smaller than the other Romantic poets’.",
                "correct_answer": "Output"
            },
            {
                "id": "4",
                "question": "Left the Wordsworths due to [4].",
                "correct_answer": "Failing health"
            }
        ],
        "table_structure": {
            "headers": ["Poet", "Observation"],
            "rows": [
                ["Byron", "[1] Went on a journey around; came to love [1]."],
                ["Wordsworth", "[2] Became more accepted when he changed his [2]."],
                ["Coleridge", "[3] His [3] was smaller than the other Romantic poets’."]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'The Dams That Changed Australia',
    'Inland Australia has had a problem with drought from the time of white settlement in 1788 until today, and this is why the Snowy Mountains Scheme was conceived and founded. Before the Snowy Scheme a large proportion of the snowfields on Australia’s highest mountains (the Snowy Mountains) melted into the Snowy River every year. Hence, Snowy River water flowed, ultimately, into the sea, not toward the dry interior of the country, where people needed it so desperately. This was first recognised by the Polish geologist and explorer Strezlecki in 1840, who commented that there could be no development of the inland without adequate water supply. The rivers would have to be diverted if irrigation were to succeed. Before Federation in 1901, Australia consisted of a group of colonies, all anxious to protect their own interests. After Federation the states retained rights to the water, and thus to what might happen to the rivers. Arguments between New South Wales, Victoria and South Australia led to a deadlocked Premiers’ Conference in 1947. Despite this serious dispute, the Federal Parliament passed the Snowy Mountains Hydro-electric Power Act just two years later, on July 7. The project was officially commenced on October 17 that year, barely three months after the act had been passed. The scheme set out to harness water for electricity and to divert it back to the dry inland areas for irrigation. To do this, thousands of kilometres of tunnels had to be drilled through the mountains, and sixteen major dams and seven hydro-electric power stations built over a period of nineteen years. The first of these was Guthega Power Station, which was commissioned in 1954. and the last one to be finished was Tumut III.\n\nThe Snowy Mountains Scheme was to alter the face of Australia forever. One important change was the recruitment of people from outside Australia to work on the scheme. In 1949, while the world was still recovering from the effects of World War II (1939 to 1945), the Australian government needed immense numbers of people to work on the Snowy. It sought labour from overseas, and 60,000 of the 100,000 people who worked on the scheme came from outside the country. They came from thirty different countries: from Italy, Yugoslavia, and Germany, from sophisticated cities like Budapest, Paris and Vienna, and from tiny hamlets. These European workers left countries which had fought against each other during the war, and which had vastly different cultures, and they found themselves in a country which was still defining itself. They were adventurous young men, some highly skilled, some not, and they came to a place which offered both enormous challenges and primitive conditions. Many were housed in tents in the early days of the scheme, although some fortunate men were placed in barracks. The food was basic, female company extremely scarce and entertainment lacking.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "Awareness that the [1] could not be developed without irrigation.",
                "correct_answer": "Inland"
            },
            {
                "id": "2",
                "question": "Dispute between the states on the rivers’ future, resulting in a [2] Premiers’ Conference.",
                "correct_answer": "Deadlocked"
            },
            {
                "id": "3",
                "question": "Snowy Mountains Scheme begins.",
                "correct_answer": "1949"
            },
            {
                "id": "4",
                "question": "Recruitment of [4] people from abroad.",
                "correct_answer": "60,000"
            }
        ],
        "table_structure": {
            "headers": ["Year", "Event"],
            "rows": [
                ["1788", "White settlement begins"],
                ["1840", "Awareness that the [1] could not be developed without irrigation"],
                ["1901", "Federation"],
                ["1947", "Dispute between the states on the rivers’ future, resulting in a [2] Premiers’ Conference"],
                ["[3]", "Snowy Mountains Scheme begins. Recruitment of [4] people from abroad"]
            ]
        }
    }'
);

INSERT INTO reading_questions (type, title, paragraph, data)
VALUES (
    'Table Completion',
    'Stepwells',
    'In Patan, the state’s ancient capital, the stepwell of Rani Ki Vav (Queen’s Stepwell) is perhaps the finest current example. It was built by Queen Udayamati during the late 11th century, but became silted up following a flood during the 13th century. But the Archaeological Survey of India began restoring it in the 1960s, and today it’s in pristine condition. At 65 metres long, 20 metres wide and 27 metres deep, Rani Ki Vav features 500 distinct sculptures carved into niches throughout the monument, depicting gods such as Vishnu and Parvati in various incarnations. Incredibly, in January 2001, this ancient structure survived a devastating earthquake that measured 7.6 on the Richter scale. Another example is the Surya Kund in Modhera, northern Gujarat, next to the Sun Temple, built by King Bhima I in 1026 to honour the sun god Surya. It’s actually a tank (kund means reservoir or pond) rather than a well, but displays the hallmarks of stepwell architecture, including four sides of steps that descend to the bottom in a stunning geometrical formation. The terraces house 108 small, intricately carved shrines between the sets of steps.\n\nIn the old ruined town of Abhaneri, about 95 kilometres east of Jaipur, is Chand Baori, one of India’s oldest and deepest wells; aesthetically, it’s perhaps one of the most dramatic. Built in around 850 AD next to the temple of Harshat Mata, the baori comprises hundreds of zigzagging steps that run along three of its sides, steeply descending 11 storeys, resulting in a striking geometric pattern when seen from afar. On the fourth side, covered verandas supported by ornate pillars overlook the steps. Still in public use is Neemrana Ki Baori, located just off the Jaipur–Dehli highway. Constructed in around 1700, it’s nine storeys deep, with the last two levels underwater. At ground level, there are 86 colonnaded openings from where the visitor descends 170 steps to the deepest water source.',
    '{
        "questions": [
            {
                "id": "1",
                "question": "As many as 500 sculpture decorate the monument, survived a devastating [1].",
                "correct_answer": "Earthquake"
            },
            {
                "id": "2",
                "question": "Steps on the [2] produce a geometrical pattern.",
                "correct_answer": "Four / 4 sides"
            },
            {
                "id": "3",
                "question": "Looks more like a [3] than a well.",
                "correct_answer": "Tank"
            },
            {
                "id": "4",
                "question": "Has [4] which provide a view of the steps.",
                "correct_answer": "Verandas"
            },
            {
                "id": "5",
                "question": "Has two [5] levels.",
                "correct_answer": "Underwater"
            }
        ],
        "table_structure": {
            "headers": ["Stepwell", "Date", "Features", "Other notes"],
            "rows": [
                ["Rani ki Vav", "Late 11th century", "As many as 500 sculptures decorate the monument", "Restored in the 1960s, excellent condition despite the [1] of 2001"],
                ["Surya Kund", "1026", "Steps on the [2] produce a geometrical pattern", "Looks more like a [3] than a well"],
                ["Raniji ki Baori", "1699", "Intricately carved monument", "One of 21 baoris in the area commissioned by Queen Nathavatji"],
                ["Chand Baori", "850 AD", "Steps take you down 11 storeys to the bottom", "Old, deep, and very dramatic. Has [4] which provide a view of the steps"],
                ["Neemrana ki Baori", "1700", "Has two [5] levels", "Used by public today"]
            ]
        }
    }'
);
