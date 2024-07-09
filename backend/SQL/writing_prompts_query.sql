CREATE TABLE writing_task1_prompts (
    id SERIAL PRIMARY KEY,
    image_id INTEGER,
    image_type VARCHAR(255),
    prompt TEXT,
    time_limit INTEGER DEFAULT 20
);

CREATE TABLE writing_task2_prompts (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    question TEXT,
    time_limit INTEGER DEFAULT 40
);

-- Criminal Justice
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Criminal Justice', 'Some people believe that there should be fixed punishments for each type of crime. Others, however, argue that the circumstances of an individual crime, and the motivation for committing it, should always be taken into account when deciding on the punishment. Discuss both views and give your own opinion.'),
('Criminal Justice', 'Some people believe that capital punishment should never be used. Others, however, argue that it should be allowed for the most serious crimes. Discuss both views and give your own opinion.'),
('Criminal Justice', 'Some people believe the purpose of prison is to punish, while others would argue that rehabilitation is its primary role. Discuss both views and give your own opinion.'),
('Criminal Justice', 'Some people feel unsafe when they are in public and at home. What are the possible causes of this and what are some possible solutions?'),
('Criminal Justice', 'Some people say that excessive noise should be a criminal offence, while others say they should be free to make noise without limitation. Discuss both views and give your own opinion.');

-- Health
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Health', 'Some people say that the best way to improve public health is by increasing the number of sports facilities. Others, however, say that this would have little effect on public health and that other measures are required. Discuss both these views and give your own opinion.'),
('Health', 'In some countries levels of health and fitness are decreasing and average weights are increasing. What do you think are the causes of these problems and what are some possible solutions?'),
('Health', 'Research indicates that the characteristics we are born with have much more influence on our personality and development than any other experiences we may have in our life. Which do you consider to be the major influence?'),
('Health', 'Schools should do more to teach students about their health and wellbeing. Do you agree or disagree?'),
('Health', 'More and more schools allow fast-food restaurants to sell their products to their students. Is it a positive or negative development?');

-- Education
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Education', 'University students must pay all tuition fees, because it benefits mostly them individually, rather than the society as a whole. Do you agree or disagree?'),
('Education', 'Some say that music, art and drama are as important as other school subjects, especially at the primary level. Do you agree or disagree?'),
('Education', 'Some people believe that studying history is very important and we must study the past to understand the present. Others say that it is useless and should not be studied at all. Discuss both views and give your own opinion.'),
('Education', 'Some teachers tend to reward students who achieve high academic results. Others, however, support and reward students that show the most improvement. Discuss both views and give your own opinion.'),
('Education', 'Giving lectures in halls to large numbers of people is an outdated method of teaching. With the technology available today, there is no justification for it and everything should be done online. To what extent do you agree or disagree?'),
('Education', 'In most universities students focus on specialised subjects, however, some people believe that universities should encourage students to study a wider variety of subjects. To what extent do you agree or disagree?'),
('Education', 'It is generally believed that some people are born with certain talents, for instance for sport or music, and others are not. However, it is sometimes claimed that any child can be taught to become a good sports person or musician. Discuss both these views and give your own opinion.'),
('Education', 'Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. What, in your opinion, should be the main function of a university?'),
('Education', 'Some parents think that childcare centres provide the best services for children of pre-school age. Other working parents think that family members such as grandparents will be better carers for their kids. Discuss both views and give your opinion.'),
('Education', 'Governments should spend more money on education than on recreation and sports. Do you agree or disagree?'),
('Education', 'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children). To what extent do you agree or disagree?'),
('Education', 'Some people think that it is better to educate girls and boys in separate schools. Others, however, believe that boys and girls benefit more from attending mixed schools. Discuss both these views and give your own opinion.'),
('Education', 'Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this. Discuss both these views and give your own opinion.'),
('Education', 'Universities should accept equal numbers of male and female students in every subject. To what extent do you agree or disagree?'),
('Education', 'In some countries young people are encouraged to work or travel for a year between finishing high school and starting university. What are the advantages and disadvantages of this?'),
('Education', 'Some people think that a sense of competition in children should be encouraged. Others believe that children who are taught to co-operate rather than compete become more useful adults. Discuss both views and give your own opinion.'),
('Education', 'Some people believe that children are given too much free time. They feel that this time should be used to do more academic work. How do you think children should spend their free time?'),
('Education', 'In many countries schools have severe problems with student behaviour. What do you think are the causes of this? What solutions can you suggest?'),
('Education', 'University students should pay in full for their own education instead of the society funding their studies. The reason is that individuals tend to benefit after graduation more than society. To what extent do you agree or disagree? Give your own opinion.'),
('Education', 'Some people believe that students should be allowed to evaluate and criticise their teachers to improve the quality of education. Others think this is disrespectful to teachers. Discuss both views, give your opinion and include relevant examples.');

-- Youth Crime
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Youth Crime', 'Nowadays many young people deliberately damage public places. What are the causes and solutions?'),
('Youth Crime', 'Some people believe that a person’s criminal record should be removed when they reach the age of 18. To what extent do you agree or disagree?'),
('Youth Crime', 'More and more young people are using drugs and alcohol and as a result, breaking the law. What are the causes of this problem? What are some possible solutions?'),
('Youth Crime', 'Children should never be put in prison with adults no matter how serious their crime. To what extent do you agree or disagree?');

-- Celebrity
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Celebrity', 'Being a celebrity – such as a movie star or professional athlete – brings problems as well as benefits. Do you think that being a celebrity has more benefits or drawbacks?'),
('Celebrity', 'Some people feel that entertainers (e.g. film stars, pop musicians or sports stars) are paid too much money. Do you agree or disagree? Which other types of job should be highly paid?'),
('Celebrity', 'Successful sports professionals can earn much more money than people in other important jobs. Some people think this is fully justified while others think it is unfair. Discuss both these views and give your own opinion.');

-- Environment
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Environment', 'There is a growing demand for fresh water nowadays and this is becoming a global problem. What are the causes and solutions?'),
('Environment', 'Many people think that too much attention and resources are given to the protection of wild animals and birds. Do you agree or disagree?'),
('Environment', 'Increasing the price of petrol is the best way to solve growing traffic and pollution problems. To what extent do you agree or disagree? What other measures do you think might be effective?'),
('Environment', 'Nowadays we are producing more and more waste. What are the causes of this? What can be done to help reduce the amount of waste we produce?'),
('Environment', 'Many people believe that companies and individuals should pay to clean up the environment in proportion to the amount of pollution they have produced. Do you agree or disagree?'),
('Environment', 'Global warming is the biggest threat we face today. To what extent do you agree or disagree?');

-- Technology
INSERT INTO writing_task2_prompts(category, question) VALUES 
('Technology', 'Children today are too dependent on computers and electronic entertainment. It would be better to encourage them to spend more time outside playing sports and games. Do you agree or disagree?'),
('Technology', 'Some people say that public libraries are an important public resource and should be free. Others say that they are just a waste of public money. Discuss both views and give your own opinion.'),
('Technology', 'Some people think that excessive use of smartphones badly affects teenagers’ literacy skills. Do you agree or disagree?'),
('Technology', 'The internet contains a lot of information that can help people, however, sometimes the information is inaccurate or wrong. Do you agree or disagree?'),
('Technology', 'Nowadays the way many people interact with each other has changed because of technology. In what ways has technology affected the types of relationships people make? Has this become a positive or negative development?'),
('Technology', 'Computers have made the world a better place to live in. Do you agree or disagree?'),
('Technology', 'Some people believe that the use of mobile phones in public is as annoying as smoking and should be banned. Do you agree or disagree?');

-- Employment
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Employment', 'Most high-level positions in companies are filled by men even though the workforce in many developed countries is more than 50 percent female. Companies should be required to allocate a certain percentage of these positions to women. Do you agree or disagree?'),
('Employment', 'Nowadays more and more people have to compete with young people for the same jobs. What problems does this cause? What are some possible solutions?'),
('Employment', 'Women and men are commonly seen as having different strengths and weaknesses. Is it right to exclude males or females from certain professions because of their gender?'),
('Employment', 'As most people spend a major part of their adult life at work, job satisfaction is an important element of individual wellbeing. What factors contribute to job satisfaction? How realistic is the expectation of job satisfaction for all workers?'),
('Employment', 'Some people think that people in senior positions alone should make decisions in a business, while others think that employees should be involved in the decision-making process too. Discuss both views and give your own opinion.'),
('Employment', 'Nowadays many people work part- or full-time from home. Some people say that working from home has many benefits while others disagree. Discuss both views and give your own opinion.'),
('Employment', 'For some people a high salary is the most important criterion when choosing a new job while others are satisfied if the job contributes to society. Discuss both views and give your opinion.');

-- Globalisation
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Globalisation', 'In many places, traditional food has been replaced by international fast food. This has adverse effects on individuals and society. Do you agree or disagree?'),
('Globalisation', 'More and more people are visiting historic sites and sometimes tourists damage these ancient sites. The number of people visiting these places should be strictly limited. Do you agree or disagree?'),
('Globalisation', 'Shopping has developed from a necessary activity to a kind of entertainment. To what extent do you agree or disagree?'),
('Globalisation', 'Many small businesses are being forced to close because they are unable to compete with multinational corporations. What problems does this cause and how can those problems be solved?'),
('Globalisation', 'Multinational companies are becoming increasingly common in developing countries. What are the advantages and disadvantages of this?');

-- Government Spending
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Government Spending', 'People prefer to watch foreign films rather than locally produced ones. Why do you think this happens? Should the government support local filmmakers financially?'),
('Government Spending', 'Some people think that governments should invest more in public services instead of wasting money on arts such as music and paintings. To what extent do you agree or disagree?'),
('Government Spending', 'Some people believe that the government should pay for and offer to house people who lost their homes or cannot afford them. To what extent do you agree or disagree?'),
('Government Spending', 'Some people think that the government should fund music, dance and art lessons for children. Others think that they should be funded by private businesses or by children’s families. Discuss both views and give your own opinion.'),
('Government Spending', 'Many people think that the government should spend money to explore outer space, while others think that it’s a waste of public money. Discuss both views and give your own opinion.'),
('Government Spending', 'Some people think that mothers should spend most of their time raising their family, and therefore the government should support them financially. Do you agree or disagree?');

-- Development
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Development', 'In some countries, the numbers of children aged 15 and younger are increasing dramatically. What are the current and future effects of an ever-increasing population?'),
('Development', 'A recent study showed that people in developed countries are not as happy as they were before development. What are the causes of this and what are some possible solutions?'),
('Development', 'Sometimes celebrities get invited to international aid events. Do you think that such events deviate from their main purpose by inviting famous people?'),
('Development', 'Some people believe that richer countries should give poorer countries more financial assistance. To what extent do you agree or disagree?'),
('Development', 'Some people believe that no aid should be given to developing countries that have poor human rights records. To what extent do you agree or disagree?');

-- Public Transport
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Public Transport', 'Some people think that a car is the best way to travel in cities while others believe a bicycle is a better way to commute. Discuss both views and give your own opinion.'),
('Public Transport', 'Many cities have serious problems with traffic congestion. What are the causes of these problems and what are some possible solutions?'),
('Public Transport', 'Growing numbers of cities are making their centres pedestrian-only zones. What are the advantages and disadvantages?'),
('Public Transport', 'Some people believe that the best way to reduce traffic congestion is to increase the price of petrol. To what extent do you agree or disagree?');

-- Society
INSERT INTO writing_task2_prompts (category, question) VALUES 
('Society', 'Every year several languages die out. Some people think that it is not important because life will be easier if there are fewer languages in the world. To what extent do you agree or disagree with this opinion?'),
('Society', 'It is becoming increasingly popular for people to travel to tourist destinations during public holidays. What problems does this cause? What solutions are there to these problems?'),
('Society', 'Today, the high sales of popular consumer goods reflect the power of advertising and not the real needs of the society in which they are sold. To what extent do you agree or disagree?'),
('Society', 'Some people believe that visitors to other countries should follow local customs and behaviour. Others disagree and think that the host country should welcome cultural differences. Discuss both these views and give your own opinion.'),
('Society', 'At present, the media affects people’s lives significantly. What impact does this have on society? Is it a negative or positive development?'),
('Society', 'Young people say that travelling to different countries benefits them and society. Do you agree or disagree? Give your opinion.'),
('Society', 'These days, more fathers stay at home and take care of their children while mothers go out to work. What are the main reasons for this? Do you think this is a positive or negative development?');
