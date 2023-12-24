import { TCourse } from './course.interface';

export const calculateCourseDuration = (
  modifiedData: Partial<TCourse>,
  existingCourse: TCourse,
) => {
  if (modifiedData?.startDate && modifiedData?.endDate) {
    const startDate = new Date(modifiedData.startDate as string);
    const endDate = new Date(modifiedData.endDate as string);
    const timeDifference = endDate.getTime() - startDate.getTime();

    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    const weeksDifference = Math.ceil(dayDifference / 7);

    modifiedData.durationInWeeks = weeksDifference;
  } else if (modifiedData?.startDate) {
    const startDate = new Date(modifiedData.startDate as string);
    const endDate = new Date(existingCourse.endDate as string);

    const timeDifference = endDate.getTime() - startDate.getTime();

    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    const weeksDifference = Math.ceil(dayDifference / 7);

    modifiedData.durationInWeeks = weeksDifference;
  } else if (modifiedData?.endDate) {
    const startDate = new Date(existingCourse.startDate as string);
    const endDate = new Date(modifiedData.endDate as string);

    const timeDifference = endDate.getTime() - startDate.getTime();

    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    const weeksDifference = Math.ceil(dayDifference / 7);

    modifiedData.durationInWeeks = weeksDifference;
  }
};
