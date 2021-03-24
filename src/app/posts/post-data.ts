import { Post } from "./post";

export class PostData {

  static Posts: Post[] = [
    {
      id: 1,
      title: 'Something Wicked This Way Comes',
      body: 'This is the most satisfying musical to hit the high school stage since Fiddler on the Roof',
      categoryid: 10
    },
    {
      id: 2,
      title: "It's not the Wizard of Oz!",
      body: "Though it doesn't have the magic of Wizard of Oz, it is a solid musical",
      categoryid: 1
    },
    {
      id: 3,
      title: "Satisfaction Guaranteed",
      body: "What a great way to spend an evening.",
      categoryid: 10
    },
    {
      id: 5,
      title: 'Emerald City Here We Come!',
      body: "If you've missed the magic of the Emerald City, here's your chance to experience it all over again in a fresh new way"
    },
    {
      id: 6,
      title: 'I Am Defying Gravity',
      body: "The songs make you feel like you are defying gravity and floating on air",
      categoryid: 2
    },
    {
      id: 8,
      title: 'Beyond the Yellow Brick Road',
      body: 'Follow the yellow brick road to a wonderfully new story in the Emerald City universe',
      categoryid: 6
    },
    {
      id: 9,
      title: 'Sad, Wickedly Sad',
      body: 'Portraying a set of characters that can never catch a break, this musical is just too sad',
      categoryid: 9
    },
    {
      id: 10,
      title: 'So, Popular?',
      body: 'The emphasis on popularity and power makes this entire story just too sad',
      categoryid: 9
    }
  ];
}