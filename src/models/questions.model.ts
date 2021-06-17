import {
  prop,
  mongoose
} from "@typegoose/typegoose";
import { Types } from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';


export class QuestionSource {
  @prop({ required: true, description: 'Banca que elaborou a questão' })
  testStandId: Types.ObjectId;
  
  @prop({ required: true })
  testStandName: string;

  @prop({ required: true })
  institutionId: Types.ObjectId;

  @prop({ required: true })
  institutionName: string;

  @prop({ required: true })
  state: string;

  @prop({ required: true })
  year: number;

  @prop()
  exam: Types.ObjectId;
}


export class QuestionClassification {
  @prop()
  classificationId: [Types.ObjectId];

  @prop()
  classificationName: [string];
}


export class QuestionLegis {
  @prop()
  classificationId: [Types.ObjectId];

  @prop()
  classificationName: [string];
}


export class Question extends TimeStamps {
  @prop({ required: true, description: 'Enunciado da questão' })
  body: string;

  @prop({ type: () => String })
  answers: string[];

  @prop({ required: true })
  correctAnswer: number;

  @prop({ required: true, _id: false })
  source: QuestionSource;

  @prop({ required: true, _id: false })
  classification: QuestionClassification;



}




const questionModel = mongoose.model('question', questionSchema);